const { forEachJsonFile, getSkill, getJsonCharacter } = require('../tools/tools')
const fs = require('fs')

;(async () => {
  const data = [
    'id\tname\tclass\tstars\teddie\tawakenable\ttalismans\tbasic\tpower\tpassive\tfury'
  ]
  let cpt = 0

  // await forEachJsonFile(character => {
  for await (const character of getJsonCharacter()) {
    console.log(++cpt, character.id)

    const {
      id,
      name,
      class: classe,
      stars,
      eddie,
      awakenable,
      talismans,
    } = character

    const locatGetSkill = (character, type) => {
      return '"' + getSkill(character, type).join('\n') + '"'
    }

    const output = [
      id,
      name,
      classe,
      stars,
      eddie,
      awakenable,
      talismans,
      locatGetSkill(character, 'Basic'),
      locatGetSkill(character, 'Power'),
      locatGetSkill(character, 'Passive'),
      locatGetSkill(character, 'Fury')
    ]

    // console.log(output.join('\t'))
    data.push(output.join('\t'))
  }

  console.log('end!')

  const fileOutput = `characters.csv`
  // const data = JSON.stringify(data, null, 2)
  fs.writeFileSync(fileOutput, data.join('\n'))
  console.log(` > ${fileOutput} created`)
  // console.log('"' + output.join('","') + '"')
})()
