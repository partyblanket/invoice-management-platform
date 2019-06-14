var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');



function createDocx (invoiceDets, userDets, templateFile = 'invoice-template.docx') {
  const content = fs
    .readFileSync(path.resolve(__dirname, templateFile), 'binary');

  const zip = new JSZip(content);

  const doc = new Docxtemplater();[]
  doc.loadZip(zip);

  doc.setData({...invoiceDets, ...userDets});

  try {
      // render the document ie replace the variables
      doc.render()
  }
  catch (error) {
      var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
      }
      console.log(JSON.stringify({error: e}));
      throw error;
  }

  var buf = doc.getZip()
              .generate({type: 'nodebuffer'});

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(path.resolve(__dirname,'invoices', 'invoice-instance.docx'), buf);
  return 'invoice-instance.docx'
}

module.exports = createDocx