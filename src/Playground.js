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
  async 'demo7: multiple operations within one transaction'() {
    const db2 = await openDB('db2', 1);
    // open a new transaction, declare which stores are involved
    let transaction = db2.transaction(['store3', 'store4'], 'readwrite');
    // do multiple things inside the transaction
    let superCat = await transaction.objectStore('store3').get('cat001');
    transaction.objectStore('store3').delete('cat001');
    transaction.objectStore('store4').add(superCat);
  },
  async 'demo8: transaction on a single store, and error handling'() {
    // we'll only operate on one store this time:
    const db1 = await openDB('db1', 1);
    // ↓ this is equal to db1.transaction(['store2'], 'readwrite'):
    let transaction = db1.transaction('store2', 'readwrite');
    // ↓ this is equal to transaction.objectStore('store2')...
    transaction.store.add('foo', 'foo');
    transaction.store.add('bar', 'bar');
    // know if the transaction was successful:
    transaction.done
      .then(() => {
        console.log('All steps success, changes committed!');
      })
      .catch(() => {
        console.error('Something went wrong, transaction aborted');
      });
  },
};
