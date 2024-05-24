import LinkedList from './linked-list.js';

class HashSet {
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
    const currentKeys = this.keys();
    this.clear();

    currentKeys.forEach((key) => this.set(key));
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

  set(key) {
    const keyHash = this.hash(key);
    const list = this.#getBucket(keyHash);
    if (!list) {
      this.#setBucket(keyHash, new LinkedList(key));
      return;
    }

    const keyIndex = list.find(key);

    if (keyIndex === null) list.append(key);
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
}

export default HashSet;
