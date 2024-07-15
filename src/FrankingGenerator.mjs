 import { createObjectCsvWriter } from 'csv-writer';

function prefixAddress(prefix, address) {
  const result = Object.fromEntries(
    Object.entries(address).map(([k, v]) => [prefix + k, v]),
  );

  return result;
}

export default class FrankingGenerator {
  static #HEADER = [
    { id: 'send_name', title: 'SEND_NAME1' },
    { id: 'send_addressLine', title: 'SEND_NAME2' },
    { id: 'send_street', title: 'SEND_STREET' },
    { id: 'send_houseNumber', title: 'SEND_HOUSENUMBER' },
    { id: 'send_postalCode', title: 'SEND_PLZ' },
    { id: 'send_city', title: 'SEND_CITY' },
    { id: 'send_countryCode', title: 'SEND_COUNTRY' },

    { id: 'recv_name', title: 'RECV_NAME1' },
    { id: 'recv_addressLine', title: 'RECV_NAME2' },
    { id: 'recv_street', title: 'RECV_STREET' },
    { id: 'recv_houseNumber', title: 'RECV_HOUSENUMBER' },
    { id: 'recv_postalCode', title: 'RECV_PLZ' },
    { id: 'recv_city', title: 'RECV_CITY' },
    { id: 'recv_countryCode', title: 'RECV_COUNTRY' },

    { id: 'coupon', title: 'COUPON' },
    { id: 'product', title: 'PRODUCT' },
    { id: 'send_email', title: 'SEND_EMAIL' },
    { id: 'recv_email', title: 'RECV_EMAIL' },
  ];

  static async saveToFile(shippments, outputPath) {
    const records = shippments.map((x) => ({
      ...prefixAddress('send', x.sender),
      ...prefixAddress('recv', x.recipient),
      ...{ coupon: x.coupon },
      ...{ product: x.product },
    }));

    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: FrankingGenerator.#HEADER,
    });

    await csvWriter.writeRecords(records);
  }
}
