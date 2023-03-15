export const getArr = (): number[] => {
  const arrSize = 4;
  const arr: number[] = new Array(arrSize)
    .fill(0)
    .map((item) => item + Math.floor(Math.random() * 100));
  return arr;
};

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export enum Action {
  AddToHead = "AddToHead",
  AddToTail = "AddToTail",
  AddByIndex = "AddByIndex",
  DeleteFromHead = "DeleteFromHead",
  DeleteFromTail = "DeleteFromTail",
  DeleteByIndex = "DeleteByIndex",
  Waiting = "",
}

export enum Position {
  Top = "Top",
  Bottom = "Bottom",
}

export interface ILinkedList<T> {
  listSize: number;
  prepend: (node: T) => void;
  append: (node: T) => void;
  addByIndex: (node: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => T[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private _head: Node<T> | null;
  private _tail: Node<T> | null;
  private _size: number;

  constructor(initArray?: T[]) {
    this._head = null;
    this._tail = null;
    this._size = 0;

    if (initArray && initArray.length > 0) {
      this._init(initArray);
    }
  }

  protected _init(initArray: T[]) {
    initArray.forEach((item) => {
      this.append(item);
    });
  }

  protected _isEmpty() {
    return this._size === 0;
  }

  protected _clearList() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  append(node: T) {
    const newNode = new Node(node);

    if (this._isEmpty()) {
      this._head = newNode;
      this._tail = newNode;
      this._size++;
    } else {
      if (this._tail) {
        this._tail.next = newNode;
      }
      this._tail = newNode;
      this._size++;
    }
  }

  prepend(node: T) {
    const newNode = new Node(node);

    if (this._isEmpty()) {
      this._head = newNode;
      this._tail = newNode;
      this._size++;
    } else {
      if (this._head) {
        newNode.next = this._head;
        this._head = newNode;
        this._size++;
      }
    }
  }

  addByIndex(node: T, index: number) {
    const newNode = new Node(node);

    if (index === 0) {
      if (this._size === 1) {
        this._tail = this._head;
      }

      newNode.next = this._head;
      this._head = newNode;
      this._size++;

      return;
    }

    let prev = this._head;
    let current = this._head;
    let i = 0;

    while (i !== index) {
      if (current && current.next) {
        prev = current;
        current = current.next;
      }

      i++;
    }

    if (prev) {
      prev.next = newNode;
    }

    newNode.next = current;
    this._size++;
  }

  deleteByIndex(index: number) {
    if (this._size === 1 && index === 0) {
      this._clearList();
      return;
    }

    let prev = this._head;
    let current = this._head;
    let i = 0;

    while (i !== index) {
      if (current && current.next) {
        prev = current;
        current = current.next;
      }

      i++;
    }

    if (prev && current) {
      if (current === this._head) {
        this._head = this._head.next;
      } else if (current === this._tail) {
        prev.next = null;
        this._tail = prev;
      } else {
        prev.next = current.next;
      }
    }

    this._size--;
  }

  toArray() {
    let res: T[] = [];
    let current = this._head;

    if (current) {
      while (current.next) {
        res.push(current.value);
        current = current.next;
      }

      res.push(current.value);
    }

    return res;
  }

  deleteTail() {
    if (this._size === 1) {
      this._clearList();
    } else {
      let current = this._head;
      let i = 1;

      if (current) {
        while (i !== this._size - 1) {
          if (current.next) {
            current = current.next;
          }

          i++;
        }

        this._tail = current;
        this._tail.next = null;
        this._size--;
      }
    }
  }

  deleteHead() {
    if (this._size < 2) {
      this._clearList();
    } else {
      if (this._head && this._head.next) {
        this._head = this._head.next;
        this._size--;
      }
    }
  }

  get listSize() {
    return this._size;
  }
}