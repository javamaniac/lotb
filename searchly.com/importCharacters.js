
const { getJsonFiles } = require('../tools/fileName')
const { addCharacter } = require('./index')

; (async () => {
  try {
    const characters = await getJsonFiles('./data-compendium/characters')
    console.time('index')
    for (const character of characters) {
      // searchly
      await addCharacter(character)
    }
    console.timeEnd('index')
  } catch (e) {
    console.error(e)
  }
})()
