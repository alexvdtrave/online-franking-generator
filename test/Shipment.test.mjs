import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { Shipment, Address, Product } from '../src/index.mjs';

describe('Shipment', () => {
  it('should initialize sender, recipient, and product from constructor', () => {
    const sender = new Address();
    sender.name = 'Sender';
    const recipient = new Address();
    recipient.name = 'Recipient';
    const product = Product.DEU.PAK02.key;

    const shipment = new Shipment(sender, recipient, product);

    assert.equal(shipment.sender, sender);
    assert.equal(shipment.recipient, recipient);
    assert.equal(shipment.product, product);
    assert.equal(shipment.coupon, undefined);
  });

  it('should support updating sender, recipient, product, and coupon via setters', () => {
    const shipment = new Shipment();

    const sender1 = new Address();
    const recipient1 = new Address();
    const sender2 = new Address();
    const recipient2 = new Address();

    shipment.sender = sender1;
    shipment.recipient = recipient1;
    shipment.product = Product.DEU.PAECK.key;
    shipment.coupon = 'COUPON123';

    assert.equal(shipment.sender, sender1);
    assert.equal(shipment.recipient, recipient1);
    assert.equal(shipment.product, Product.DEU.PAECK.key);
    assert.equal(shipment.coupon, 'COUPON123');

    shipment.sender = sender2;
    shipment.recipient = recipient2;
    shipment.product = Product.EU.PAK05.key;
    shipment.coupon = 'DISCOUNT50';

    assert.equal(shipment.sender, sender2);
    assert.equal(shipment.recipient, recipient2);
    assert.equal(shipment.product, Product.EU.PAK05.key);
    assert.equal(shipment.coupon, 'DISCOUNT50');
  });
});
