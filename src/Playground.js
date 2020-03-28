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
        db.createObjectStore('store3', { keyPath: 'id' });
        db.createObjectStore('store4', { autoIncrement: true });
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
  async 'demo4: auto generate keys'() {
    const db2 = await openDB('db2', 1);
    db2.add('store3', { id: 'cat001', strength: 10, speed: 10 });
    db2.add('store3', { id: 'cat002', strength: 11, speed: 9 });
    db2.add('store4', { id: 'cat003', strength: 8, speed: 12 });
    db2.add('store4', { id: 'cat004', strength: 12, speed: 13 });
  },
  async 'demo5: retrieve values'() {
    const db2 = await openDB('db2', 1);
    // retrieve by key
    db2.get('store3', 'cat001').then(console.log);
    // retrieve all
    db2.getAll('store3').then(console.log);
    // count the totle number or items in a store
    db2.count('store3').then(console.log);
  },
  async 'demo6: replace item with same key'() {
    // set db1/store1/delivered to be false:
    const db1 = await openDB('db1', 1);
    db1.put('store1', false, 'delivered');

    // replace cat001 with a supercat
    const db2 = await openDB('db2', 1);
    db2.put('store3', { id: 'cat001', strength: 99, speed: 99 });
  },
};
