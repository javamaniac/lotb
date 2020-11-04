const fs = require('fs')
const addCharater = require('./addCharater')

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

; (async () => {
  console.time('index')
  for await (const f of getFiles('./data')) {
    console.log(f)

    fs.readFile(f, 'utf8', (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err)
        return
      }

      try {
        const character = JSON.parse(jsonString)
        // addCharater(character)
        console.log(character.name, 'indexed')
      } catch (err) {
        console.log('Error parsing JSON string:', err)
      }
    })
  }
  console.timeEnd('index')
})()
