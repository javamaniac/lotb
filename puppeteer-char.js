const puppeteer = require('puppeteer')
const parse = require('./lotbParser').parse
const fs = require('fs')

let browser = null
let page = null

async function run (url) {
  // return new Promise(async (resolve, reject) => {
  if (!browser) {
    browser = await puppeteer.launch({
      // devtools: true,
      // headless: false
      // slowMo: 2500 // slow down by 250ms
    })
    page = await browser.newPage()
  }

  await page.goto(url)

  console.log(`Parsing ${url}...`)
  const character = await page.evaluate(parse)

  const exportJson = false
  if (exportJson) {
    const fileOutput = `data/${character.name}.json`
    const data = JSON.stringify(character, null, 2)
    fs.writeFileSync(fileOutput, data)
    console.log(` > ${fileOutput} created`)
  }

  return character

  // browser.close()
}

module.exports.run = run
