/// <reference path="../../typings/tsd.d.ts" />

import test from 'tape';

function sleep(ms: number): Promise<number> {
  return new Promise<number>(resolve => setTimeout(resolve, ms));
}

test('sleep', async function(t) {
    const start: number = Date.now();
    await sleep(20);
    const end: number = Date.now();
    t.ok(end - start >= 20, 'takes about 20 milliseconds');
    t.end();
});
