import HashMap from './hashmap.js';

const hashMap = new HashMap();

// hashMap.set('ben', 10);
// hashMap.set('kevin', 11);
// hashMap.set('gwen', 10);
// hashMap.set('Alpha', 'male');
hashMap.set('Key', 'value');
hashMap.set('Key', 'brown');

console.log(hashMap.hash('Key'), hashMap.entries());
