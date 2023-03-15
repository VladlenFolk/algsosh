export const size: number = 7;

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHead: () => { value: T | null; index: number };
  getTail: () => { value: T | null; index: number };
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail += 1;
    this.length += 1;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.length -= 1;
    this.head += 1;
  };

  getHead = () => {
    return { value: this.container[this.head], index: this.head };
  };

  getTail = () => {
    return { value: this.container[this.tail - 1], index: this.tail - 1 };
  };

  clear = () => {
    this.tail = 0;
    this.head = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;
}