const puppeteer = require('puppeteer')
const fs = require('fs')

/**
 * 
 * @param {String} url 
 * @param {String} anchorSelector 
 * Ex : '.talisman-con a'
 * @param {Function} extractFn 
 */
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

  const listeItems = await page.evaluate((anchorSelector) => {
    return Array.from(document.querySelectorAll(anchorSelector)).map(el => {     
      const image = el.querySelector('img') ? el.querySelector('img').src : ''      
      return { 
        href: el.href,
        image
      }
    })
  }, anchorSelector)

  browser.close()

  let nbTraite = 0
  const nbTotal = listeItems.length
  console.time('temps')
  for (const item of listeItems) {
    const href = item.href
    const id = generateId(href)
    console.log(`${++nbTraite}/${nbTotal} ${id}...`)
    await extractFn(item)
    // await postData('http://localhost:9200/<target>/_doc/</target>', character)
  }
  console.timeEnd('temps') // 4 min
}

let browser = null
let page = null

/**
 * 
 * @param {*} param
 * @param {*} param.item
 * @param {*} param.item.href
 * @param {*} [param.item.image]
 * @param {Function} param.parse
 * @param {*} param.folder
 */
async function extactLotb ({item, parse, folder}) {
  const url = item.href

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

  const params = {id, ...item}  
  const character = await page.evaluate(parse, params)

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
  const prefix = splitted[4].substring(0,3) + '-'
  const id = (splitted[splitted.length - 1] === '') ? splitted[splitted.length - 2] : splitted[splitted.length - 1]
  return prefix + id
}

module.exports = { forEachLotb, extactLotb, generateId }
