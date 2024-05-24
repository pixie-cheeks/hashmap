import LinkedList from './linked-list.js';

class HashMap {
  #buckets = [];
  #bucketsLength = 16;
  #loadFactor = 0.75;

  #getBucket(index) {
    if (index < 0 || index >= this.#bucketsLength) {
      throw new Error('Trying to access index out of bound');
    }
    return this.#buckets[index];
  }

  #setBucket(index, value) {
    if (index < 0 || index >= this.#bucketsLength) {
      throw new Error('Trying to access index out of bound');
    }
    this.#buckets[index] = value;

    if (this.#getNumberOfBuckets() >= this.#bucketsLength * this.#loadFactor) {
      this.#bucketsLength *= 2;
      this.#rehash();
    }
  }

  #getNumberOfBuckets() {
    let numberOfBuckets = 0;

    this.#buckets.forEach((bucket) => {
      if (bucket) numberOfBuckets += 1;
    });

    return numberOfBuckets;
  }

  #rehash() {
    const currentBuckets = this.entries();
    this.clear();

    currentBuckets.forEach((bucket) => {
      this.set(bucket[0], bucket[1]);
    });
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.#bucketsLength;
    }

    return hashCode;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    const list = this.#getBucket(keyHash);
    if (!list) {
      const newList = new LinkedList(key);
      newList.head().keyValue = value;

      this.#setBucket(keyHash, newList);
      return;
    }

    const keyIndex = list.find(key);

    if (keyIndex !== null) {
      list.at(keyIndex).keyValue = value;
    } else {
      list.append(key);
      list.tail().keyValue = value;
    }
  }

  get(key) {
    const list = this.#getBucket(this.hash(key));

    if (!list) return null;

    const keyIndex = list.find(key);

    if (keyIndex === null) return null;

    return list.at(keyIndex).keyValue;
  }

  has(key) {
    const list = this.#getBucket(this.hash(key));

    if (!list) return false;
    if (list.find(key) === null) return false;

    return true;
  }

  remove(key) {
    const list = this.#getBucket(this.hash(key));

    if (!list) return false;

    const keyIndex = list.find(key);

    if (keyIndex === null) return false;

    list.removeAt(keyIndex);
    return true;
  }

  length() {
    let numberOfStoredKeys = 0;
    this.#buckets.forEach((bucket) => {
      if (bucket) {
        numberOfStoredKeys += bucket.size();
      }
    });

    return numberOfStoredKeys;
  }

  clear() {
    this.#buckets = [];
  }

  keys() {
    const keys = [];

    this.#buckets.forEach((bucket) => {
      let currentNode = bucket.head();
      while (currentNode) {
        keys.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    });

    return keys;
  }

  values() {
    const values = [];

    this.#buckets.forEach((bucket) => {
      let currentNode = bucket.head();
      while (currentNode) {
        values.push(currentNode.keyValue);
        currentNode = currentNode.nextNode;
      }
    });

    return values;
  }

  entries() {
    const entries = [];

    this.#buckets.forEach((bucket) => {
      let currentNode = bucket.head();
      while (currentNode) {
        entries.push([currentNode.value, currentNode.keyValue]);
        currentNode = currentNode.nextNode;
      }
    });

    return entries;
  }
}

export default HashMap;
