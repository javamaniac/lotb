const fs = require('fs')
const util = require('util')

// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
const { resolve } = require('path')
const { readdir } = require('fs').promises

async function * getFiles (dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield * getFiles(res)
    } else {
      yield res
    }
  }
}

const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8')

async function * getJsonCharacter () {
  for await (const file of getFiles('./data-compendium/characters')) {
    const jsonString = await readFile(file)
    const character = JSON.parse(jsonString)
    yield character
  }
}

/**
 *
 * @param {*} fn
 */
const forEachJsonFile = async (fn) => {
  for await (const file of getFiles('./data-compendium/characters')) {
    fs.readFile(file, 'utf8', (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err)
        return
      }

      try {
        const character = JSON.parse(jsonString)
        fn(character)
      } catch (err) {
        console.log('Error parsing JSON string:', err)
      }
    })
  }
}

/**
 *
 * @param {Object} character
 * @param {String} SkillType
 */
const getSkill = (character, SkillType) => {


  const filtered = character.skills
    .filter(skill => skill.type === SkillType)

  if (!filtered || !filtered[0]) {
    return []
  }

  if (SkillType === 'Passive') {
    // Fix passive description
    const desc = filtered[0].desc
    if (desc.length === 1) {
      filtered[0].desc = desc[0].split('. ')
    }
  }

  const skills = []
  filtered.forEach((skill) => skills.push(...skill.desc))
  return skills
}

module.exports.forEachJsonFile = forEachJsonFile
module.exports.getSkill = getSkill
module.exports.getJsonCharacter = getJsonCharacter
