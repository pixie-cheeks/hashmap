/* eslint-disable max-classes-per-file */

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  #head;

  constructor(value = null) {
    this.#head = new Node(value);
  }

  append(value) {
    if (!this.#head) {
      this.prepend(value);
      return;
    }

    this.tail().nextNode = new Node(value);
  }

  prepend(value) {
    this.#head = new Node(value, this.#head);
  }

  size() {
    let totalNodes = 0;
    let currentNode = this.#head;
    while (currentNode) {
      totalNodes += 1;
      currentNode = currentNode.nextNode;
    }

    return totalNodes;
  }

  head() {
    return this.#head;
  }

  tail() {
    if (!this.#head) return this.#head;

    let lastNode = this.#head;
    while (lastNode.nextNode) {
      lastNode = lastNode.nextNode;
    }

    return lastNode;
  }

  at(index) {
    if (index < 0) return null;

    let currentNode = this.#head;

    for (let i = 0; i < index; i += 1) {
      if (!currentNode) return null;
      currentNode = currentNode.nextNode;
    }

    return currentNode;
  }

  pop() {
    if (!this.#head) return;

    if (!this.#head.nextNode) {
      this.#head = null;
      return;
    }

    let secondLastNode = this.#head;
    while (secondLastNode.nextNode.nextNode) {
      secondLastNode = secondLastNode.nextNode;
    }

    secondLastNode.nextNode = null;
  }

  contains(value) {
    let currentNode = this.#head;

    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    let currentNode = this.#head;
    let currentIndex = 0;

    while (currentNode) {
      if (currentNode.value === value) return currentIndex;

      currentNode = currentNode.nextNode;
      currentIndex += 1;
    }

    return null;
  }

  insertAt(value, index) {
    const nodeBeforeInsertion = this.at(index - 1);

    nodeBeforeInsertion.nextNode = new Node(
      value,
      nodeBeforeInsertion.nextNode,
    );
  }

  removeAt(index) {
    const nodeBeforeRemoval = this.at(index - 1);
    if (!(nodeBeforeRemoval && nodeBeforeRemoval.nextNode))
      throw new Error('No node at index');
    const nodeAfterRemoval = nodeBeforeRemoval.nextNode.nextNode;

    nodeBeforeRemoval.nextNode = nodeAfterRemoval;
  }

  toString() {
    let currentNode = this.#head;
    let string = '';

    while (currentNode) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    string += null;

    return string;
  }
}

export default LinkedList;
