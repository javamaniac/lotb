const puppeteer = require('puppeteer')
const fs = require('fs')

async function forEachLotb (url, anchorSelector, extractFn) {
  const browser = await puppeteer.launch({
    // devtools: true,
    // headless: false
    // slowMo: 2500 // slow down by 250ms
  })
  const page = await browser.newPage()

  await page.goto(url)

  // console.log('anchorSelector', anchorSelector)
  // console.log(document.querySelectorAll(anchorSelector))

  const listeHref = await page.evaluate((anchorSelector) => {
    return Array.from(document.querySelectorAll(anchorSelector)).map(el => el.href)
  }, anchorSelector)

  browser.close()

  let nbTraite = 0
  const nbTotal = listeHref.length
  console.time('temps')
  for (const href of listeHref) {
    const id = generateId(href)
    console.log(`${++nbTraite}/${nbTotal} ${id}...`)
    await extractFn(href)
    // await postData('http://localhost:9200/<target>/_doc/</target>', character)
  }
  console.timeEnd('temps') // 4 min
}

let browser = null
let page = null

// extactLotb(url, parseCharacter, 'data-compendium/bespoke')
async function extactLotb (url, parseFn, folder) {

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
  const character = await page.evaluate(parseFn)

  const exportJson = true
  if (exportJson) {
    const fileOutput = `${folder}/${id}.json`
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

module.exports = { forEachLotb, extactLotb }
