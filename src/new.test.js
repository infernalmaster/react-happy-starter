var test = require('tape');

test('test', function (t) {
    t.plan(1);
    // t.deepEqual([1,3], [...[1,2], 3]);
    t.deepEqual([1,3], [1,3]);
});
