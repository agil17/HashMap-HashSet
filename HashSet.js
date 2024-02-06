class Node {
  constructor(key) {
    this.key = key;
    this.next = null;
  }
}

class HashSet {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.bucket = new Array(capacity);
    this.bucket.fill(null);
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  clear() {
    this.bucket = new Array(this.capacity);
    this.bucket.fill(null);
    this.size = 0;
  }

  get(key) {
    if (typeof key !== "string") return "Key must be of type string";
    let keys = this.keys();
    let target = keys.find((entry) => entry === key);
    let index = this.hash(target);
    let curr = this.bucket[index];
    while (curr) {
      if (curr.key === key) {
        return curr.key;
      }
      curr = curr.next;
    }
    return null;
  }

  has(key) {
    if (typeof key !== "string") return "Key must be of type string";
    return this.keys().includes(key);
  }

  hash(key, capacity = this.capacity) {
    if (typeof key !== "string") return "Not a string key";
    let hashCode = 1;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  keys() {
    const nonNullBuckets = this.bucket.filter((bucket) => bucket !== null);
    const includeChained = [];
    nonNullBuckets.forEach((bucket) => {
      while (bucket) {
        includeChained.push(bucket.key);
        bucket = bucket.next;
      }
    });
    return includeChained;
  }

  length() {
    return this.size;
  }

  remove(key) {
    if (typeof key !== "string") return "Key must be of type string";
    let hasKey = this.has(key);
    let index = this.hash(key);

    let curr = this.bucket[index];
    let prev = null;
    while (curr) {
      if (curr.key === key) {
        if (prev === null) {
          this.bucket[index] = curr.next;
        } else {
          prev.next = curr.next;
        }
        this.size--;
        break;
      }
      prev = curr;
      curr = curr.next;
    }

    return hasKey;
  }

  resize() {
    this.size = 0;
    let entrieList = this.keys();
    this.capacity = this.capacity * 2;
    this.bucket = new Array(this.capacity);
    this.bucket.fill(null);
    entrieList.forEach((entry) => this.set(entry));
  }

  set(key) {
    if (typeof key !== "string") return "Key must be of type string";
    let index = this.hash(key);
    let curr = this.bucket[index];
    while (curr) {
      if (curr.key === key) {
        return "Element exists in set";
      }
      curr = curr.next;
    }
    let newNode = new Node(key);
    newNode.next = this.bucket[index];
    this.bucket[index] = newNode;
    this.size++;
    if (this.size >= this.loadFactor * this.capacity) {
      this.resize();
    }
  }
}

let set = new HashSet(8);
set.set("string");
set.set("value");
set.set("qfqdsi91sdtr");
set.set("qfqddedtr");
set.set("qfqdedtr");
set.set("qfdtr");
set.set("dasdgasdg");
set.set("dasdgg");

console.log(set.has("dasdgg"));
