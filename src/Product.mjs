const products = {
  DEU: {
    PAECKS: { key: 'PAECKS.DEU', name: 'Päckchen S' },
    PAECK: { key: 'PAECK.DEU', name: 'Päckchen M' },
    PAK02: { key: 'PAK02.DEU', name: 'Paket 2 kg' },
    PAK05: { key: 'PAK05.DEU', name: 'Paket 5 kg' },
    PAK10: { key: 'PAK10.DEU', name: 'Paket 10 kg' },
    PAK31: { key: 'PAK31.DEU', name: 'Paket 31,5 kg' },
  },
  EU: {
    PAECKXS: { key: 'PAECKXS.EU', name: 'Päckchen XS EU bis 2 kg' },
    PAECK: { key: 'PAECK.EU', name: 'Päckchen' },
    PAK02: { key: 'PAK02.EU', name: 'Paket 2 kg' },
    PAK05: { key: 'PAK05.EU', name: 'Paket 5 kg' },
    PAK10: { key: 'PAK10.EU', name: 'Paket 10 kg' },
    PAK20: { key: 'PAK20.EU', name: 'Paket 20 kg' },
    PAK315: { key: 'PAK315.EU', name: 'Paket 31,5 kg' },
  },
};

export default class Product {
  static get DEU() {
    return products.DEU;
  }

  static get EU() {
    return products.EU;
  }
}
