const INVOICE_DEFAULTS = {
  from: {
    name: 'Company Name',
    address: [
      'Slotenmakerstraat 33',
      '1901 SB Castricum',
      'The Netherlands',
    ]
  },
  to: {},
  lines: [
    {
      item: 'an item',
      amount: 3,
      value: 4.5,
    },
    {
      item: 'item two',
      amount: 5,
      value: 5.5,
    },
    {
      item: 'item three',
      amount: 5,
      value: 5.5,
    },
    {
      item: 'item four',
      amount: 5,
      value: 5.5,
    },
    {
      item: 'item fve',
      amount: 5,
      value: 5.5,
    },
    {
      item: 'item six',
      amount: 5,
      value: 5.54,
    },
  ],
  date: '12 April 2019',
  locale: '',
  currency: 'EUR',
}

export default INVOICE_DEFAULTS