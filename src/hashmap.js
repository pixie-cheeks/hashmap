class HashMap {
  buckets = [];
  bucketsLength = 16;
  capacity = 0;
  loadFactor = 0.75;

  #getBucket(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    return this.buckets[index];
  }

  #setBucket(index, value) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    this.buckets[index] = value;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketsLength;
    }

    return hashCode;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    if (!this.#getBucket(keyHash)) {
      this.#setBucket(keyHash, value);
      return;
    }
    this.#setBucket(keyHash, value);
  }
}

export default HashMap;
