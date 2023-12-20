import {
  AggregatorCache,
  AggregatorEnum,
  AggregatorQueue,
  SUM_INTERVAL,
} from './types';
import { Stream } from './stream';

export function simulateDataStream(
  callback: (...args: any[]) => Promise<number>,
) {
  const data = [...Array(100).keys()]
    .map((i) => Math.floor(Math.random() * (i + 1)))
    .filter((i) => i > 0);

  let id = 0;
  const stream = new Stream(data);
  for (const item of stream.lazyLoad()) {
    const key = `${AggregatorEnum.SUM}${id++}`;
    callback(item, key);
  }
}

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
        queue[0].timestamp < Date.now() - SUM_INTERVAL
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
