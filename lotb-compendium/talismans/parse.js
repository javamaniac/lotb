// Pas accès
const parse = (args) => {
  const { id, image } = args

  const getClassName = () => {
    return id.split('-').reverse()[0]
  }

  const parseSkills = () => {
    const skillsDesc = document.querySelector('.talisman-des p').innerText
      .split('. ')
      .filter(desc => desc !== '')
    const type = document.querySelectorAll('.talisman-table .talisman-row p')[1].innerText
    return (type === 'Ability') ? { type, powerSkills: skillsDesc } : { type, passiveSkills: skillsDesc }
  }

  const talisman = {
    id,
    name: cleanText(document.querySelector('.talisman-title h1').innerHTML),
    class: getClassName(),
    set: Number.parseInt(document.querySelector('.talisman-table .talisman-row p').innerText),
    ...parseSkills(),
    url: document.location.href,
    image
  }

  function cleanText (text) {
    return text.replace('↵', '')
  }

  console.log('talisman : ', talisman.name)
  return talisman
}

module.exports = { parse }
