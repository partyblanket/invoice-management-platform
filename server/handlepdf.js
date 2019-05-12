const puppeteer = require('puppeteer');
const stringHTML = require('./dummyHTML')
const fs = require('fs')
const {promisify} = require('util')
let browser = null

const writeFile = promisify(fs.writeFile)



async function saveToPDF (html) {
  if (browser === null) browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox',], headless: true} );
  const page = await browser.newPage();
  await page.setContent(html)
  const pdf = await page.pdf({format: 'A4'})
  await writeFile('pdf2.pdf', pdf)
  console.log('written pdf');
  
}

module.exports = saveToPDF
