var test = require('ava');

test('timing test', t => {
    t.plan(2);

    t.is(typeof Date.now, 'function');
    t.deepEqual({x: 1}, {x: 1});

    // setTimeout(function () {
    //     t.is(101, 100, 'same');
    // }, 0);
});

test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});

import App from './App.js';
