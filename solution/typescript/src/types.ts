export const SUM_INTERVAL = 100; // 10s

export enum AggregatorEnum {
  SUM = 'sum',
  AVG = 'avg',
  MAX = 'max',
  MIN = 'min',
  COUNT = 'count',
  DISTINCT = 'distinct'
}

export type QueueElement = {
  timestamp: number,
  value: number
};

export type AggregatorQueue = Array<QueueElement>;

export type AggregatorCache = Map<string, number>;

export type Callback = (...args: any[]) => Promise<number>;