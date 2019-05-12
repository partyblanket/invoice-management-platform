module.exports = (data) => {
  const today = new Date();
  const lines = data.invoiceLines.map((el, index) => `
  <div class='line'>
  <p>${el.amount}</p>
  <p>${el.sku}</p>
  <p>${el.price}</p>
  <p>${el.description}</p>
  <p>${el.vat}</p>
  <p>${el.amount * el.price}</p>
  </div>
  `)
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    html{
      margin: 50px;

    }
    #top{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
    #top > div{
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      border: 1px solid black;
      padding: 6px;
    }
    .items .line{
  display: grid;
  grid-template-columns: 3rem 6rem 6rem 6fr 4rem 1fr;
  grid-gap: 1rem 1rem;
  margin: 1rem;

}

.items * {
  height: 1rem;
  font-size: 1.3rem;
}

.note-total {
  display: grid;
  justify-content: flex-end;
  margin-right: 3rem;
  grid-template-rows: auto;
  grid-template-columns: 1fr 15rem 11rem;
  grid-template-areas:
    "note exvat exvatamnt"
    "note vat vatamnt"
    "note incvat incvatamnt";
  text-align: right;
  margin-top: 1rem;
}

.note-total *{
  margin: 0.7rem;
  font-size: 1.8rem;
}

.exvat {
  grid-area: exvat;
  
}

.exvatamnt {
  grid-area: exvatamnt;
  text-align: left;
}

.incvat {
  grid-area: incvat;
}

.incvatamnt {
  grid-area: incvatamnt;
  text-align: left;
}

.vat {
  grid-area: vat;
}

.vatamnt {
  grid-area: vatamnt;
  text-align: left;
}
  </style>
</head>
<body>
  <h1>INVOICE</h1>

  <div id='top'>
    
    <div id='invoicee'>
      <p>Invoiced to</p><p></p>
      <div>Name:</div><div>Jan Jaap Braam</div>
      <div>Phone:</div><div>+31-251653841</div>
      <div>Address:</div><div>Ketelweg 43</div>
      <div>City:</div><div>Castricum</div>
      <div>Postcode:</div><div>1901 SB</div>
      <div>Country:</div><div>Netherlands</div>
    </div>
    
    <div id='shippee'>
      <p>Shipped to:</p><p></p>
      <div>Name:</div><div>Jan Jaap Braam</div>
      <div>Phone:</div><div>+31-251653841</div>
      <div>Address:</div><div>Ketelweg 43</div>
      <div>City:</div><div>Castricum</div>
      <div>Postcode:</div><div>1901 SB</div>
      <div>Country:</div><div>Netherlands</div>    
    </div>
  
    <div id='other-dets'>
      <p></p><p></p>
      <div>Invoice date:</div><div>01/01/1983</div>
      <div>Due date:</div><div>01/01/1984</div>
      <div>Shipment date:</div><div>01/01/1985</div>
      <div>Payment terms:</div><div>FOB</div>

    </div>
  </div>
  <div class='items'>
      <div class='line'>
        <div>Amnt.</div>
        <div>SKU</div>
        <div>Unit price</div>
        <div>Item description</div>
        <div>VAT</div>
        <div>Total:</div>
      </div>
      ${lines}
      <div class='note-total'>
        <p class='exvat'>Total ex. VAT:</p><p class='exvatamnt'>EUR 100</p>
        <p class='vat'>Total VAT:</p><p class='vatamnt'>EUR 10</p>
        <p class='incvat'>Total inv. VAT:</p><p class='incvatamnt'>EUR 110</p>
        <div rows="4" cols="50" class='note'>SOME TEXT</div>
      </div>


    </div>
</body>
</html>
    `;
};