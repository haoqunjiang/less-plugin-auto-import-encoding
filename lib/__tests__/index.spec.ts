/// <reference path="../../typings/tsd.d.ts" />

import test from 'blue-tape';

function sleep(ms: number): Promise<number> {
    return new Promise((resolve: (value: any) => void) =>
        setTimeout(resolve, ms)
    );
}

test('sleep', async function(t: test.Test): Promise<void> {
    const start: number = Date.now();
    await sleep(20);
    const end: number = Date.now();
    t.ok(end - start >= 20, 'takes about 20 milliseconds');
});
