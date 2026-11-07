import {
  describe, it, before, after,
} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

import {
  FrankingGenerator, Address, Shipment, Product,
} from '../src/index.mjs';

describe('FrankingGenerator', () => {
  let tempDir;
  const samplePath = path.resolve('test', 'data', 'sample.csv');

  before(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'franking-generator-test-'));
  });

  after(async () => {
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  function createSampleShipment() {
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

    return new Shipment(sender, recipient, Product.EU.PAK02.key);
  }

  it('generates CSV import file and matches sample data', async () => {
    const outputPath = path.join(tempDir, 'sample_output.csv');
    const shipment = createSampleShipment();

    await FrankingGenerator.saveToFile([shipment], outputPath);

    const actual = await fs.readFile(outputPath, 'utf-8');
    const expected = await fs.readFile(samplePath, 'utf-8');

    assert.equal(actual, expected);
  });

  it('generates CSV string in-memory via generateCsv and toCsv', async () => {
    const shipment = createSampleShipment();
    const expected = await fs.readFile(samplePath, 'utf-8');

    const csvFromGenerate = FrankingGenerator.generateCsv([shipment]);
    assert.equal(csvFromGenerate, expected);

    const csvFromTo = FrankingGenerator.toCsv([shipment]);
    assert.equal(csvFromTo, expected);
  });

  it('generates CSV header only when shipments list is empty or undefined', () => {
    const expectedHeader = 'SEND_NAME1,SEND_NAME2,SEND_STREET,SEND_HOUSENUMBER,SEND_PLZ,SEND_CITY,SEND_COUNTRY,RECV_NAME1,RECV_NAME2,RECV_STREET,RECV_HOUSENUMBER,RECV_PLZ,RECV_CITY,RECV_COUNTRY,COUPON,PRODUCT,SEND_EMAIL,RECV_EMAIL\n';

    assert.equal(FrankingGenerator.generateCsv([]), expectedHeader);
    assert.equal(FrankingGenerator.generateCsv(), expectedHeader);
  });

  it('handles plain JavaScript objects as addresses', () => {
    const plainShipment = {
      sender: {
        name: 'Plain Sender',
        street: 'Main St',
        houseNumber: '1',
        postalCode: '12345',
        city: 'Town',
        countryCode: 'DEU',
        email: 'sender@plain.com',
      },
      recipient: {
        name: 'Plain Recipient',
        street: 'Second St',
        houseNumber: '2',
        postalCode: '67890',
        city: 'City',
        countryCode: 'AUT',
        email: 'recipient@plain.com',
      },
      product: 'PAK02.DEU',
      coupon: 'DISCOUNT',
    };

    const csv = FrankingGenerator.generateCsv([plainShipment]);
    const lines = csv.trim().split('\n');
    assert.equal(lines.length, 2);
    assert.equal(
      lines[1],
      'Plain Sender,,Main St,1,12345,Town,DEU,Plain Recipient,,Second St,2,67890,City,AUT,DISCOUNT,PAK02.DEU,sender@plain.com,recipient@plain.com',
    );
  });

  it('correctly escapes values with commas, quotes, and newlines according to RFC 4180', () => {
    const shipment = {
      sender: {
        name: 'Doe, John "The Boss"',
        street: 'Street with, comma',
        addressLine: 'Line 1\nLine 2',
        city: 'City "Special"',
        countryCode: 'DEU',
      },
      recipient: {
        name: 'Jane Doe',
        countryCode: 'DEU',
      },
      product: 'PAK02.DEU',
    };

    const csv = FrankingGenerator.generateCsv([shipment]);
    assert.match(csv, /"Doe, John ""The Boss"""/);
    assert.match(csv, /"Street with, comma"/);
    assert.match(csv, /"Line 1\nLine 2"/);
    assert.match(csv, /"City ""Special"""/);
  });

  it('generates multiple shipments correctly in a single CSV', () => {
    const shipment1 = createSampleShipment();
    const shipment2 = createSampleShipment();

    const csv = FrankingGenerator.generateCsv([shipment1, shipment2]);
    const lines = csv.trim().split('\n');

    // 1 header line + 2 record lines
    assert.equal(lines.length, 3);
  });
});
