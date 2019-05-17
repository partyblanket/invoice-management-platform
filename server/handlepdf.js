const puppeteer = require('puppeteer');
const stringHTML = require('./dummyHTML')
const fs = require('fs')
const {promisify} = require('util')
const createHtml = require('./templates')
const path = require('path')

let browser = null


const writeFile = promisify(fs.writeFile)



async function saveToPDF (invoiceDets, userDets, template) {
  console.log(invoiceDets);
  
  const html = createHtml(invoiceDets, userDets, template)
  
  if (browser === null) browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true} );
  const page = await browser.newPage();
  await page.setContent(html)
  const pdf = await page.pdf({format: 'A4'})
  const location = path.join(__dirname,'invoices',invoiceDets.billingName+'.pdf')
  
  await writeFile(location, pdf)
  console.log('written pdf @ ',location);
  return invoiceDets.billingName
} 

module.exports = saveToPDF
