const puppeteer = require('puppeteer')
const extractCharacter = require('./extract-character').run

async function run () {
  const browser = await puppeteer.launch({
    // devtools: true,
    // headless: false
    // slowMo: 2500 // slow down by 250ms
  })
  const page = await browser.newPage()

  // const url = 'http://www.news.maiden-lotb.com/n3/character-en/?wpv_view_count=4908&wpv-character_class_cat%5B%5D=warrior&wpv-level%5B%5D=1star'
  const url = 'http://www.news.maiden-lotb.com/n3/character-en/'
  await page.goto(url)

  const listeHref = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.ch-icon a')).map(el => el.href)
  })

  browser.close()

  let nbTraite = 0
  const nbTotal = listeHref.length
  console.time('temps')
  for (const href of listeHref) {
    const id = generateId(href)
    console.log(`${++nbTraite}/${nbTotal} ${id}...`)
    const character = await extractCharacter(href)
    // await postData('http://localhost:9200/<target>/_doc/</target>', character)
  }
  console.timeEnd('temps') // 4 min
}

function generateId (href) {
  const splitted = href.split('/')
  return (splitted[splitted.length - 1] === '') ? splitted[splitted.length - 2] : splitted[splitted.length - 1]
}

run()
