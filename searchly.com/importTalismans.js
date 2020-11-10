
const { getJsonFiles } = require('../tools/fileName')
const { addTalisman } = require('./index')

; (async () => {
  try {
    const talismans = await getJsonFiles('./data-compendium/talismans')
    console.time('index')
    for (const talisman of talismans) {
      // searchly
      await addTalisman(talisman)
    }
    console.timeEnd('index')
  } catch (e) {
    console.error(e)
  }
})()
