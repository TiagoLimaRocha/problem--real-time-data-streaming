import { SUM_INTERVAL } from './types';
import { Stream } from './stream';

export function simulateDataStream(callback: Function) {
  const data = [...Array(10).keys()]
    .map((i) => Math.floor(Math.random() * (i + 1)))
    .filter((i) => i > 0);

  console.log({ data });

  let id = 0;
  let pid: NodeJS.Timeout | undefined;

  const stream = new Stream(data);
  for (const item of stream.lazyLoad()) {
    callback(item);
  }
  clearInterval(pid);
}

export async function processStreamData(
  data: number,
  cache: Map<string, number>,
  key: string
) {
  return new Promise((resolve, reject) => {
    try {
      let sum: number = cache.has(key) ? (cache.get(key) as number) : 0;
      cache.set(key, sum + data);
      resolve(sum);
    } catch (error) {
      reject(error);
    }
  });
}
