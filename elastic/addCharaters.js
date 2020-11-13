const fs = require('fs')
const addCharater = require('./addCharater')
const { addDoc } = require('../searchly.com/index')

// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
const { resolve } = require('path')
const { readdir } = require('fs').promises
const util = require('util')


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

; (async () => {
  // Convert fs.readFile into Promise version of same    
  const readFile = util.promisify(fs.readFile);

  console.time('index')
  for await (const f of getFiles('./data-compendium/characters')) {
    console.log(f)

    const jsonString =  await readFile(f, 'utf8')

    try {
      const character = JSON.parse(jsonString)
      
      // elasticsearch local
      // addCharater(character)

      // searchly
      // await addDoc(character)

      console.log(character.name, 'indexed')
    } catch (err) {
      console.log('Error parsing JSON string:', err)
    }
  }
  console.timeEnd('index')
})()
