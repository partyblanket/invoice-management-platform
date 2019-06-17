export const invoiceDefault = {
  amount: 1,
  sku: '',
  price: 0,
  description: '',
  vat: 20
}

export const detsDefault = {
  status: 'draft',
  billingCompany: '',
  billingName: '',
  billingPhone: '+49',
  billingAddressLineOne: '',
  billingAddressLineTwo: '',
  billingPostcode: '',
  billingCity: '',
  shippingCompany: '',
  shippingName: '',
  shippingPhone: '',
  shippingAddressLineOne: '',
  shippingAddressLineTwo: '',
  shippingPostcode: '',
  shippingCity: '',
  shippingDate: '',
  invoiceDate: '',
  includingTax: true,
  paymentTerms: '',
  dueDate: '',
  currency: 'EUR',
  invoiceLines: [{ ...invoiceDefault }],
  invoiceTotals: {inc:0,ex:0,vat:0},
  privateNote: '',
  terms: '',
  incVat: false,
  invoiceid: 'NEW',
}

