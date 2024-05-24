import HashMap from './hashmap.js';

const hashMap = new HashMap();

hashMap.set('ben');
hashMap.set('kevin');
hashMap.clear();
hashMap.set('gwen');
hashMap.set('Alpha');
hashMap.set('Key');
hashMap.set('Key');
hashMap.set('Alpha');
hashMap.set('Big');
hashMap.set('Dig');
hashMap.set('Illegal');
hashMap.set('Bruno');
hashMap.set('Albino');
hashMap.set('ten');
hashMap.set('13');
hashMap.set('14');
hashMap.set('15');

console.log(hashMap.has('Illegal'));
console.log(hashMap.has('Illegaal'));
console.log(hashMap.remove('Alpha'));
console.log(hashMap.remove('tena'));
console.log(hashMap.length());
console.log(hashMap.keys());
