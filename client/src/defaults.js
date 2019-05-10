const INVOICE_DEFAULTS = {
  from: {
    name: {
      c: 'Company Name',
      style: {
        width: '200px'
      },
  },
    address: {
      c: [
        'Slotenmakerstraat 33',
        '1901 SB Castricum',
        'The Netherlands',
      ],
      style: {width: '300px'}
    } 
  },
  to: {
    name: {
      c: 'Other Company Name',
      style: {width: '300px'},
    },
    address: {
      c: [
        'Plitdorferokatz 33',
        '1901 SB Ramstein',
        'Germany',
      ],
      style: {width: '300px'},
    }
  },
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
  title: {
    c: 'Invoice',
    style:{width: '150px'},
  },
  InvoiceNumber: {
    c: 10567,
    style: {},
  },
  dateOfIssue: {
    c: '12 April 2019',
    style: {width: '150px'},
  },
  locale: '',
  currency: 'EUR',
  note: {
    c: 'Thank you',
    style:  {}
  }
}

export default INVOICE_DEFAULTS