import fs from 'node:fs/promises';

const ADDRESS_FIELDS = [
  'name',
  'addressLine',
  'street',
  'houseNumber',
  'postalCode',
  'city',
  'countryCode',
  'email',
];

function prefixAddress(prefix, address = {}) {
  const result = {};
  for (const field of ADDRESS_FIELDS) {
    const val = address[field] ?? address[`_${field}`];
    if (val !== undefined && val !== null) {
      result[`${prefix}_${field}`] = val;
    }
  }

  return result;
}

function escapeCsvValue(value) {
  if (value === undefined || value === null) {
    return '';
  }
  const str = String(value);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replaceAll('"', '""')}"`;
  }
  return str;
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

  static generateCsv(shipments = []) {
    const headerRow = FrankingGenerator.#HEADER.map((h) => h.title).join(',');
    const rows = shipments.map((x) => {
      const record = {
        ...prefixAddress('send', x.sender),
        ...prefixAddress('recv', x.recipient),
        coupon: x.coupon,
        product: x.product,
      };

      return FrankingGenerator.#HEADER
        .map((h) => escapeCsvValue(record[h.id]))
        .join(',');
    });

    return [headerRow, ...rows].join('\n') + '\n';
  }

  static toCsv(shipments = []) {
    return FrankingGenerator.generateCsv(shipments);
  }

  static async saveToFile(shipments, outputPath) {
    const csvContent = FrankingGenerator.generateCsv(shipments);
    await fs.writeFile(outputPath, csvContent, 'utf-8');
  }
}

