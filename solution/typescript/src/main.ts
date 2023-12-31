import { AggregatorCache, AggregatorQueue } from './types';
import { simulateDataStream, processStreamData } from './data';

async function main() {
  const cache: AggregatorCache = new Map<string, number>();
  const queue: AggregatorQueue = [];

  simulateDataStream((value: number, key: string) =>
    processStreamData(value, key, cache, queue)
  );

  setTimeout(() => {
    console.log({ cache });
  }, 1000)
}

main();
