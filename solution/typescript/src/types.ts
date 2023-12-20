export const SUM_INTERVAL = 1 * 10000; // 10s
export const MAX_CONCURRENCY_LIMIT = 10;

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

export type Promises<T> = (() => Promise<T>)[];