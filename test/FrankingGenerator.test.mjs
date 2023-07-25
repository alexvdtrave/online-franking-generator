import test from 'node:test';
import assert from 'node:assert/strict';

import fs from 'fs';
import path from 'path';

import {
  FrankingGenerator, Address, Shipment, Product,
} from '../src/index.mjs';

test('Franking Genrator tests', async (t) => {
  const OUTPUT_FILENAME = 'out.csv';
  const DATA_DIR = path.join(path.resolve(), 'test', 'data');

  t.afterEach(async () => {
    if (fs.existsSync(OUTPUT_FILENAME)) {
      fs.rmSync(OUTPUT_FILENAME);
    }
  });

  await t.test('Generates CSV import file', async () => {
    const sender = new Address();
    sender.name = 'Erika Mustermann';
    sender.street = 'Gartenstr.';
    sender.houseNumber = '20';
    sender.postalCode = '18556';
    sender.city = 'Kleinkleckersdorf';
    sender.countryCode = 'DEU';
    sender.email = 'erika@example.com';

    const recipient = new Address();
    recipient.name = 'Otto Normalverbraucher';
    recipient.street = 'Dingstr. 30';
    recipient.postalCode = '1010';
    recipient.city = 'Vienna';
    recipient.countryCode = 'AUT';
    recipient.email = 'otto@example.net';

    const shipment = new Shipment(sender, recipient, Product.EU.PAK02.key);
    await FrankingGenerator.saveToFile([shipment], OUTPUT_FILENAME);

    assert.equal(fs.existsSync(OUTPUT_FILENAME), true);

    const actual = fs.readFileSync(OUTPUT_FILENAME).toString();

    const samplePath = path.resolve(DATA_DIR, 'sample.csv');
    const expected = fs.readFileSync(samplePath).toString();

    assert.equal(actual, expected);
  });
});
