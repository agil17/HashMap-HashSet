class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
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

  entries() {
    const nonNullBuckets = this.bucket.filter((bucket) => bucket !== null);
    const includeChained = [];
    nonNullBuckets.forEach((bucket) => {
      while (bucket) {
        includeChained.push([bucket.key, bucket.value]);
        bucket = bucket.next;
      }
    });
    return includeChained;
  }

  get(key) {
    if(typeof key !== "string") return "Key must be of type string";
    let keys = this.keys();
    let target = keys.find((entry) => entry === key);
    let index = this.hash(target);
    let curr = this.bucket[index];
    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }
    return null;
  }

  has(key) {
    if(typeof key !== "string") return "Key must be of type string";
    return this.keys().includes(key);
  }

  hash(key, capacity = this.capacity) {
    if (typeof key !== "string") return "Not a string key";
    let hashCode = 1;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      //   console.log(key.charCodeAt(i));
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  //   keys() {
  //     const nonNullBuckets = this.bucket
  //       .filter((bucket) => bucket !== null)
  //       .map(({ key }) => key);
  //     return nonNullBuckets;
  //   }

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
    if(typeof key !== "string") return "Key must be of type string";
    let hasKey = this.has(key);
    let index = this.hash(key);
    
    let curr = this.bucket[index];
    let prev = null;
    while(curr) {
        if(curr.key === key) {
            if(prev === null) {
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
    let entrieList = this.entries();
    this.capacity = this.capacity * 2;
    this.bucket = new Array(this.capacity);
    this.bucket.fill(null);
    entrieList.forEach((entry) => this.set(entry[0], entry[1]));
  }

  set(key, value) {
    if(typeof key !== "string") return "Key must be of type string";
    let index = this.hash(key);
    let curr = this.bucket[index];
    while (curr) {
      if (curr.key === key) {
        curr.value = value;
        return;
      }
      curr = curr.next;
    }
    let newNode = new Node(key, value);
    newNode.next = this.bucket[index];
    this.bucket[index] = newNode;
    this.size++;
    if (this.size >= this.loadFactor * this.capacity) {
      this.resize();
    }
  }

  values() {
    const nonNullBuckets = this.bucket.filter((bucket) => bucket !== null);
    const includeChained = [];
    nonNullBuckets.forEach((bucket) => {
      while (bucket) {
        includeChained.push(bucket.value);
        bucket = bucket.next;
      }
    });
    return includeChained;
  }
}

let map = new HashMap(8);


map.set("string", 32);
map.set("value", 15);
map.set("qfqdsi91sdtr", 1);
map.set("qfqddedtr", 2);
map.set("qfqdedtr", 3);
map.set("qfdtr", 5);
map.set("dasdgasdg", 6);
map.set("dasdgg", 8);

console.log(map.capacity);


console.log(map.entries());

// console.log(map.keys());

// console.log(map.has("dasdfsdgg"));

// map.set("dagg", 9);
// console.log(map.bucket.length);

// console.log(map.entries());
// console.log(map.length());
// console.log(!null);

// console.log(map.hash(node1.key));
// console.log(map.hash(node3.key));
// console.log(map.hash(node1.key));
// console.log(map.hash(node2.key));
// console.log(map.hash(chainedNode4.key));

// const checkNodes = (map) => {
//   map.bucket.forEach((node) => { qfqddtr9 qfqdedtr6 qfqdsi91sdtr6
//     if (node === null) {
//       console.log(true);
//     } else {
//       console.log(false);
//     }
//   });
// };
// checkNodes(map);
