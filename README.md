# Online Franking Generator
![Node CI](https://github.com/alexvdtrave/online-franking-generator/actions/workflows/node-ci.yml/badge.svg)
![CodeQL](https://github.com/alexvdtrave/online-franking-generator/actions/workflows/github-code-scanning/codeql/badge.svg)

This is a Node.js library to generate csv files for usage in DHL online franking.

The CSV import can be used on this page:
https://www.dhl.de/de/privatkunden/pakete-versenden/online-frankieren.html?type=ShoppingCartImport

### Installing
You may need to add the following to ```.npmrc```.
```
@alexvdtrave:registry=https://npm.pkg.github.com
```
```shell
npm install @alexvdtrave/online-franking-generator
```

### Usage

This is an example of how a CSV file can be generated.
```JavaScript
import {
  FrankingGenerator, Address, Shipment, Product,
} from '@alexvdtrave/online-franking-generator';

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
await FrankingGenerator.saveToFile([shipment], 'out.csv');
```
Example output
```
SEND_NAME1,SEND_NAME2,SEND_STREET,SEND_HOUSENUMBER,SEND_PLZ,SEND_CITY,SEND_COUNTRY,RECV_NAME1,RECV_NAME2,RECV_STREET,RECV_HOUSENUMBER,RECV_PLZ,RECV_CITY,RECV_COUNTRY,COUPON,PRODUCT,SEND_EMAIL,RECV_EMAIL
Erika Mustermann,,Gartenstr.,20,18556,Kleinkleckersdorf,DEU,Otto Normalverbraucher,,Dingstr. 30,,1010,Vienna,AUT,,PAK02.EU,erika@example.com,otto@example.net
```

## Running the tests
```shell
npm test
npm run lint
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
