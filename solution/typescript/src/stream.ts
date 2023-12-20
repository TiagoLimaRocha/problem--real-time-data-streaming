/**
 * Represents a stream of data.
 * @template T The type of data in the stream.
 */
export class Stream<T> {
  private it: Iterator<T>;

  /**
   * Creates a new instance of the Stream class.
   * @param data An array of data elements.
   */
  constructor(private readonly data: T[]) {
    this.it = this.data[Symbol.iterator]();
  }

  /**
   * Retrieves the next element from the stream.
   * @returns The next element in the stream, or undefined if the stream is empty.
   */
  public next() {
    const next = this.it.next();
    return !next.done && next.value;
  }

  /**
   * Lazily loads the elements of the stream.
   * @yields The elements of the stream.
   */
  public * lazyLoad() {
    for (const item of this.data) {
      yield item;
    }
  }
}
