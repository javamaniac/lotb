const puppeteer = require('puppeteer')
const parse = require('./lotbParser').parse
const fs = require('fs')

async function run () {
  const browser = await puppeteer.launch({
    // devtools: true,
    // headless: false
    // slowMo: 2500 // slow down by 250ms
  })
  const page = await browser.newPage()

  // page.on('console', msg => console.log('PAGE LOG:', msg.text()))

  const url = 'http://www.news.maiden-lotb.com/n3/character-en/khan-eddie-warrior/'
  await page.goto(url)
  // await page.screenshot({ path: 'screenshots/github.png' });

  // await page.evaluate(() => {
  //   console.log(document.querySelector('.ch-title').innerText)
  // })

  console.log(`Parsing ${url}...`)
  const character = await page.evaluate(parse)
  const fileOutput = `data/${character.name}.json`
  // console.log(character)
  // console.log(character.skills[0].desc)

  const data = JSON.stringify(character, null, 2)
  fs.writeFileSync(fileOutput, data)
  console.log(` > ${fileOutput} created`)

  browser.close()
}

run()

// get all href character
// Array.from(document.querySelectorAll('.ch-icon a')).map(el => el.href)
