
const { getJsonFiles } = require('../tools/fileName')
const { addBespoke } = require('./index')

; (async () => {
  try {
    const bespokes = await getJsonFiles('./data-compendium/bespokes')
    console.time('index')
    for (const bespoke of bespokes) {
      // searchly
      await addBespoke(bespoke)
    }
    console.timeEnd('index')
  } catch (e) {
    console.error(e)
  }
})()
