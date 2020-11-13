const parse = (image2) => {
  console.log('image', image2)

  const generateId = href => {
    const splitted = href.split('/')
    return (splitted[splitted.length - 1] === '') ? splitted[splitted.length - 2] : splitted[splitted.length - 1]
  }

  const id = generateId(document.location.href)

  const container = document.querySelectorAll('.cosmic-talisman')[2]
  const name = container.querySelector('h2').innerHTML.split(') ')[1]
  const image = container.querySelector('img').src
  const passiveSkills = container.querySelector('.cosmic-talisman-des p').innerHTML.split('. ')
  const owner = container.querySelector('.cosmic-talisman-des p').innerHTML.split('. ')[4].split('equipped to ')[1]

  const bespoke = {
    id,
    type: 'bespoke',
    name: cleanText(name),
    owner,
    set: 1,
    passiveSkills,
    url: document.location.href,
    image
  }

  function cleanText (text) {
    return text.replace('↵', '')
  }

  console.log('talisman : ', bespoke.name)
  return bespoke
}

module.exports = { parse }
// module.exports.parse = parse
