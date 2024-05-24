import HashMap from './hashmap.js';

const hashMap = new HashMap();

hashMap.set('ben', 10);
hashMap.set('kevin', 11);
hashMap.set('gwen', 10);
hashMap.set('Alpha', 'male');
hashMap.set('Key', 'value');
hashMap.set('Key', 'brown');
hashMap.set('Alpha', 'female');
hashMap.set('Big', 'Brother');
hashMap.set('Dig', 'Dug');
hashMap.set('Illegal', 'Aliens');
hashMap.set('Bruno', 'Mars');
hashMap.set('Albino', 'Albana');
hashMap.set('ten', 10);
hashMap.set('13', 13);
hashMap.set('14', 14);
hashMap.set('15', 15);

console.log(hashMap.get('ben'));
console.log(hashMap.get('bena'));
console.log(hashMap.has('Illegal'));
console.log(hashMap.remove('Alpha'));
console.log(hashMap.entries());
