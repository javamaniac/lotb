// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search

const fs = require('fs')
const util = require('util')
const { resolve } = require('path')
const { readdir } = require('fs').promises

async function * getFileName (dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield * getFileName(res)
    } else {
      yield res
    }
  }
}

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile)

const readJsonFile = async (fileName) => {
  const jsonString = await readFile(fileName, 'utf8')
  try {
    return JSON.parse(jsonString)
  } catch (err) {
    console.log('Error parsing JSON string:', err)
  }
}

const getJsonFiles = async (folder) => {
  const files = []
  for await (const fileName of getFileName(folder)) {
    files.push(await readJsonFile(fileName))
  }
  return files
}

module.exports = {
  getJsonFiles
  // getFileName,
  // readJsonFile
}
