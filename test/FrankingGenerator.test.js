/* eslint-disable no-undef */
const fs = require('fs');

const {
  FrankingGenerator, Address, Shipment, Product,
} = require('../index');

describe('Franking Genrator tests', () => {
  const OUTPUT_FILENAME = 'out.csv';

  afterEach(() => {
    if (fs.existsSync(OUTPUT_FILENAME)) {
      fs.rmSync(OUTPUT_FILENAME);
    }
  });

  it('Generates CSV import file', async () => {
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

    expect(fs.existsSync(OUTPUT_FILENAME)).toBeTruthy();

    const actual = fs.readFileSync(OUTPUT_FILENAME);
    const expected = fs.readFileSync(`${__dirname}/data/sample.csv`);

    expect(actual).toEqual(expected);
  });
});
