import {
  AggregatorCache,
  AggregatorEnum,
  AggregatorQueue,
  Callback,
  Promises,
  SUM_INTERVAL,
  MAX_CONCURRENCY_LIMIT,
} from './types';
import { Stream } from './stream';
import { promiseAllLimited } from './promise';

/**
 * Simulates a data stream by generating random data and invoking a callback function for each item in the stream.
 * @param callback The callback function to be invoked for each item in the stream.
 * @returns void
 */
export function simulateDataStream(callback: Callback) {
  // Generate mock data
  const data = [...Array(100).keys()]
    .map((i) => Math.floor(Math.random() * (i + 1)))
    .filter((i) => i > 0);

  // Create an array of promises
  const promises: Promises<number> = [];

  // Create and process a stream of data
  let id = 0;
  const stream = new Stream(data);
  for (const item of stream.lazyLoad()) {
    const key = `${AggregatorEnum.SUM}${id++}`;
    promises.push(() => callback(item, key));
  }

  // Wait for all promises to resolve
  promiseAllLimited<number>(promises, MAX_CONCURRENCY_LIMIT)
    .then((results: number[]) => {
      console.log({ results });
    })
    .catch((err) => {
      console.error(err);
    });
}

/**
 * Processes the stream data by adding it to the queue, removing elements older than a certain interval,
 * calculating the sum of the queue, and storing the total sum in the cache.
 * @param data - The data to be processed.
 * @param key - The key to store the sum in the cache.
 * @param cache - The cache to store the sum.
 * @param queue - The queue to add the data and calculate the sum from.
 * @returns A promise that resolves with the calculated sum.
 */
export async function processStreamData(
  data: number,
  key: string,
  cache: AggregatorCache,
  queue: AggregatorQueue
): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      // Add new element to the queue
      queue.push({ timestamp: Date.now(), value: data });

      // Remove elements older than SUM_INTERVAL seconds
      while (
        queue.length > 0 &&
        Date.now() - queue[0].timestamp > SUM_INTERVAL
      ) {
        queue.shift();
      }

      // Calculate the sum of the queue
      const sum = queue.reduce((acc, curr) => acc + curr.value, 0);

      // Store the total sum in the cache
      cache.set(key, sum);
      resolve(sum);
    } catch (error) {
      reject(error);
    }
  });
}
