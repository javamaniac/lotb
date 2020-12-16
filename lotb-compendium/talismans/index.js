const { forEachLotb, extactLotb } = require('../util')
const { parse } = require('./parse')

const url = 'http://www.news.maiden-lotb.com/n3/talisman-en/'
const anchorSelector = '.talisman-con a'
const folder = 'data-compendium/talismans'

async function run () {
  try {
    await forEachLotb(url, anchorSelector, extract)
  } catch (e) {
    console.warn(e)
  }
}

const extract = async item => {
  await extactLotb({item, parse, folder})
}

run()
