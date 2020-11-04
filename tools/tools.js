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
  for await (const file of getFiles('./data')) {
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
  for await (const file of getFiles('./data')) {
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
 * @param {*} character
 * @param {*} type
 */
const getSkill = (character, type) => {
  const filtered = character.skills
    .filter(skill => skill.type === type)
  if (!filtered) {
    return []
  }
  const skills = []
  filtered.forEach((skill) => skills.push(...skill.desc))
  return skills
}

module.exports.forEachJsonFile = forEachJsonFile
module.exports.getSkill = getSkill
module.exports.getJsonCharacter = getJsonCharacter
