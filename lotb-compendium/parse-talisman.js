const parse = (image) => {

  console.log('image', image)

  const generateId = href => {
    const splitted = href.split('/')
    return (splitted[splitted.length - 1] === '') ? splitted[splitted.length - 2] : splitted[splitted.length - 1]
  }

  const id = generateId(document.location.href)
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
    set: document.querySelector('.talisman-table .talisman-row p').innerText,
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

exports.parse = parse
