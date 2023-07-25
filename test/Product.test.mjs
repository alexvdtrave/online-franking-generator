import test from 'node:test';
import assert from 'node:assert/strict';

import { Product } from '../src/index.mjs';

test('Product', async (t) => {
  await t.test('should lookup DEU product by key', async () => {
    const actual = Product.DEU.PAK02.key;

    assert.equal(actual, 'PAK02.DEU');
  });

  await t.test('Verify non-leap year', async () => {
    const actual = Product.EU.PAK02.key;

    assert.equal(actual, 'PAK02.EU');
  });
});
