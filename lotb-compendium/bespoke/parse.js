const parse = (args) => {
  console.log('args', args)
  const { id } = args

  const container = document.querySelectorAll('.cosmic-talisman')[2]
  const name = container.querySelector('h2').innerHTML.split(') ')[1]
  const image = container.querySelector('img').src
  const passiveSkills = container.querySelector('.cosmic-talisman-des p').innerHTML.split('. ')
  const owner = passiveSkills[passiveSkills.length - 1].split('equipped to ')[1]

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
