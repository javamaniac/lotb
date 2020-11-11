const puppeteer = require('puppeteer')
const parseCharacter = require('./parse-character').parse
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

  const id = generateId(url)

  console.log(`Parsing ${id}...`)
  const character = await page.evaluate(parseCharacter)

  const exportJson = true
  if (exportJson) {
    const fileOutput = `data-compendium/characters/${id}.json`
    const data = JSON.stringify(character, null, 2)
    fs.writeFileSync(fileOutput, data)
    console.log(` > ${fileOutput} created`)
  }

  const debug = false
  if (debug) {
    console.log(character)
  }

  return character

  // browser.close()
}

function generateId (href) {
  const splitted = href.split('/')
  return (splitted[splitted.length - 1] === '') ? splitted[splitted.length - 2] : splitted[splitted.length - 1]
}

module.exports.run = run

// run('http://www.news.maiden-lotb.com/n3/character-en/daedalus-warrior/')
