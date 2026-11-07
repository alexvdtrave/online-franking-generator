import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { Address } from '../src/index.mjs';

describe('Address', () => {
  it('should initialize with undefined properties and support all getters and setters', () => {
    const address = new Address();

    address.name = 'Max Mustermann';
    address.addressLine = 'c/o Musterfirma';
    address.street = 'Hauptstraße';
    address.houseNumber = '42a';
    address.postalCode = '10115';
    address.city = 'Berlin';
    address.countryCode = 'DEU';
    address.email = 'max@example.com';

    assert.equal(address.name, 'Max Mustermann');
    assert.equal(address.addressLine, 'c/o Musterfirma');
    assert.equal(address.street, 'Hauptstraße');
    assert.equal(address.houseNumber, '42a');
    assert.equal(address.postalCode, '10115');
    assert.equal(address.city, 'Berlin');
    assert.equal(address.countryCode, 'DEU');
    assert.equal(address.email, 'max@example.com');
  });

  it('should allow modifying existing values', () => {
    const address = new Address();
    address.name = 'Old Name';
    address.name = 'New Name';

    assert.equal(address.name, 'New Name');
  });
});
