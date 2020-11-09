const puppeteer = require('puppeteer')
const parseTalisman = require('./parse-talisman').parse
const fs = require('fs')

let browser = null
let page = null

async function run ({href, image}) {
  // return new Promise(async (resolve, reject) => {
  if (!browser) {
    browser = await puppeteer.launch({
      // devtools: true,
      // headless: false
      // slowMo: 2500 // slow down by 250ms
    })
    page = await browser.newPage()
  }

  try {
    console.log(href, image)
    await page.goto(href)
  } catch (e) {
    console.error(e)
    return
  }

  const id = generateId(href)

  console.log(`Parsing ${id}...`)
  const talisman = await page.evaluate(parseTalisman, image)

  const exportJson = true
  if (exportJson) {
    const fileOutput = `data-compendium/talismans/${id}.json`
    const data = JSON.stringify(talisman, null, 2)
    fs.writeFileSync(fileOutput, data)
    console.log(` > ${fileOutput} created`)
  }

  const debug = false
  if (debug) {
    console.log(talisman)
  }

  return talisman

  // browser.close()
}

function generateId (href) {
  const splitted = href.split('/')
  return (splitted[splitted.length - 1] === '') ? splitted[splitted.length - 2] : splitted[splitted.length - 1]
}

module.exports.run = run

// run('http://www.news.maiden-lotb.com/n3/character-en/daedalus-warrior/')
