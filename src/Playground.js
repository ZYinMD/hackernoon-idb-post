import { openDB } from 'idb';

export const playground = {
  'demo1: Getting started'() {
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
  async 'demo2: Add some key values pairs in store1'() {
    const db1 = await openDB('db1', 1);
    db1.add('store1', 'hello world', 'message');
    db1.add('store1', true, 'delivered');
  },
  async 'demo3: Error handling'() {
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
