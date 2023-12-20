import { AggregatorEnum } from './types';
import { simulateDataStream, processStreamData } from './data';

async function main() {
  const cache = new Map<string, number>();
  const key = 'sum';

  simulateDataStream((value: number) =>
    processStreamData(value, cache, AggregatorEnum.SUM)
  );

  console.log({ cache });
}

main();
