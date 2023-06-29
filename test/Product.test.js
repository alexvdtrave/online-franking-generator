/* eslint-disable no-undef */
const { Product } = require('../index');

describe('Product', () => {
  it('should lookup DEU product by key', () => {
    expect(Product.DEU.PAK02.key).toEqual('PAK02.DEU');
  });

  it('should lookup EU product by key', () => {
    expect(Product.EU.PAK02.key).toEqual('PAK02.EU');
  });
});
