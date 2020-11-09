const puppeteer = require('puppeteer')
const extractCharacter = require('./extract-character').run

const f = () => {
  return new Promise(async (resolve, reject) => {
    setTimeout(() => { resolve() }, 1000)
  })
}

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

// async function postData (url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   })
//   return response.json() // parses JSON response into native JavaScript objects
// }

run()
