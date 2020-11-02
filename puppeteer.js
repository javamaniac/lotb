const puppeteer = require('puppeteer')
// const LotbParser = require('./lotbParser').LotbParser
const parse = require('./lotbParser').parse

// console.log(LotbParser.version)

// const parse = () => {
//   parse (element) {
//     console.log('ici')
//     const chararter = {
//       name: cleanText(element.querySelector('.ch-title').innerText),
//       skills: []
//     }

//     element.querySelectorAll('.skill-menu-container tr').forEach(skillrow => {
//       const [, tdSkillName, tdSkillDesc] = skillrow.querySelectorAll('td')
//       if (!tdSkillName) {
//         return
//       }

//       const [skillName, skillType, textPowerCost] = tdSkillName.querySelector('td p')
//         .innerText.split(/[()]/)

//       const listeSkillDesc = tdSkillDesc.querySelector('td p')
//         .innerText.split(/(\n|\.)/)

//       const skill = {
//         name: cleanText(skillName),
//         typeName: skillType,
//         type: parseType(skillType),
//         desc: listeSkillDesc
//       }

//       if (textPowerCost) {
//         skill.powerCost = Number.parseInt(textPowerCost.split(':')[1])
//       }

//       chararter.skills.push(skill)
//     })

//     function cleanText (text) {
//       return text.replace('↵', '')
//     }

//     function parseType (type) {
//       type = type.toLowerCase()
//       if (type.includes('fury')) {
//         return 'Fury'
//       }
//       if (type.includes('passive')) {
//         return 'Passive'
//       }
//       if (type.includes('power')) {
//         return 'Power'
//       }
//       if (type.includes('basic')) {
//         return 'Basic'
//       }
//       console.warn('Type undefined!', type)
//       return 'Undefined!'
//     }

//     // console.log(chararter)
//     return chararter
//   }
// }

async function run () {
  const browser = await puppeteer.launch({
    devtools: true,
    headless: false
    // slowMo: 2500 // slow down by 250ms
  })
  const page = await browser.newPage()

  page.on('console', msg => console.log('PAGE LOG:', msg.text()))

  await page.goto('http://www.news.maiden-lotb.com/n3/character-en/khan-eddie-warrior/')
  // await page.screenshot({ path: 'screenshots/github.png' });

  await page.evaluate(() => {
    console.log(document.querySelector('.ch-title').innerText)
  })

  const charactor = await page.evaluate(parse)
  console.log(charactor)

  browser.close()
}

run()
