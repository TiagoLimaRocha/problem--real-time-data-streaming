import { Promises } from "types";

export async function promiseAllLimited<T>(
  promises: Promises<T>,
  limit: number
): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    let activePromises: number = 0;
    let finishedPromises: number = 0;

    const results: T[] = [];
    const totalPromises: number = promises.length;

    function next() {
      if (!promises.length) {
        if (finishedPromises === totalPromises) {
          resolve(results);
        }
        return;
      }

      activePromises++;
      const promise: Promise<T> = promises.shift()!();

      promise
        .then((result) => {
          results.push(result);
        })
        .catch((err) => reject(err))
        .finally(() => {
          finishedPromises++;
          activePromises--;
          next();
        });
    }

    for (let i = 0; i < limit && i < promises.length; i++) {
      next();
    }
  });
}
