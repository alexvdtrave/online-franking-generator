import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { Product } from '../src/index.mjs';

describe('Product', () => {
  it('should lookup DEU product by key', () => {
    const actual = Product.DEU.PAK02.key;

    assert.equal(actual, 'PAK02.DEU');
  });

  it('should lookup EU product by key', () => {
    const actual = Product.EU.PAK02.key;

    assert.equal(actual, 'PAK02.EU');
  });
});
