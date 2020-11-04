const { forEachJsonFile, getSkill, getJsonCharacter } = require('../tools/tools')
const fs = require('fs')

;(async () => {
  console.log(`id\tname\tclass","stars","awakenable","eddie","basic","passive","power","fury"`)

  const data = []
  let cpt = 0

  // await forEachJsonFile(character => {
  for await (const character of getJsonCharacter()) {
    console.log(++cpt, character.id)

    const {
      id,
      name,
      class: classe,
      stars,
      awakenable,
      eddie
    } = character

    const locatGetSkill = (character, type) => {
      return '"' + getSkill(character, type).join('\n') + '"'
    }

    const output = [
      id,
      name,
      classe,
      stars,
      awakenable,
      eddie,
      locatGetSkill(character, 'Basic'),
      locatGetSkill(character, 'Passive'),
      locatGetSkill(character, 'Power'),
      locatGetSkill(character, 'Fury')
      // '"' + getSkill(character, 'Basic').join('\n') + '"',
      // '"' + getSkill(character, 'Passive').join('\n') + '"',
      // '"' + getSkill(character, 'Power').join('\n') + '"',
      // '"' + getSkill(character, 'Fury').join('\n') + '"'
    ]

    // console.log(output.join('\t'))
    data.push(output.join('\t'))
  }

  console.log('end!')

  const fileOutput = `character.csv`
  // const data = JSON.stringify(data, null, 2)
  fs.writeFileSync(fileOutput, data.join('\n'))
  console.log(` > ${fileOutput} created`)
  // console.log('"' + output.join('","') + '"')
})()
