import React from 'react';
import { openDB } from 'idb';

const playground = {
  // create 4 stores in 2 dbs
  'demo1: create 2 dbs and 4 stores'() {
    openDB('db1', 1, {
      upgrade(db) {
        db.createObjectStore('store1');
        db.createObjectStore('store2');
      },
    });
    openDB('db2', 1, {
      upgrade(db) {
        db.createObjectStore('store3');
        db.createObjectStore('store4');
      },
    });
  },
  async 'demo2: add some key values pairs in store1'() {
    const db1 = await openDB('db1', 1);
    db1.add('store1', 'hello world', 'message');
    db1.add('store1', true, 'delivered');
  },
  async 'demo3: error handling'() {
    const db1 = await openDB('db1', 1);
    db1
      .add('store1', 'hello again!!', 'new message')
      .then(result => {
        console.log('new message success!', result);
      })
      .catch(err => {
        console.error('new message error: ', err);
      });
  },
};

export function Playground() {
  return (
    <>
      {Object.entries(playground).map(entry => {
        const [key, value] = entry;
        return (
          <div key={key}>
            <button onClick={value}>{key}</button>
          </div>
        );
      })}
    </>
  );
}
