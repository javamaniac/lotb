const parse = () => {
  const generateId = href => {
    const splitted = href.split('/')
    return (splitted[splitted.length-1] === '') ? splitted[splitted.length-2] : splitted[splitted.length-1]
  }

  const getTalisman = () => {
    const divTalisman = Array.from(document.querySelectorAll('.character-container > div')).find(div => {
      const h3 = div.querySelector('h3')
      return h3 && h3.innerHTML.toLowerCase() === 'talisman slots'
    })
  
    const slotList = Array.from(divTalisman.querySelectorAll('img')).map(img => {
      return img.src.split(/[_.]/).reverse()[1]
    })

    const talismanMapping = {
      free: '',
      warrior: 'W',
      magus: 'M',
      sentinel: 'S',
      gunner: 'G',
      assassin: 'A',
    }
    let slotsCode = ''
    slotList.forEach(slot => {
      slotsCode += talismanMapping[slot]
    })
    return slotsCode
  }

  const getSkills = () => {
    // skills
    const skills = []
    document.querySelectorAll('.skill-menu-container tr').forEach(skillrow => {
      const [, tdSkillName, tdSkillDesc] = skillrow.querySelectorAll('td')
      if (!tdSkillName) {
        return
      }    

      const [skillName, skillType, textPowerCost] = tdSkillName.querySelector('td p')
        .innerText.split(/[()]/)

      const listeSkillDesc = tdSkillDesc.querySelector('td p')
        .innerText.split(/\n/)
      // .innerText.split(/(\n|\.)/)

      const skill = {
        name: cleanText(skillName),
        typeName: skillType,
        type: parseType(skillType),
        desc: listeSkillDesc
      }

      if (textPowerCost) {
        skill.powerCost = Number.parseInt(textPowerCost.split(':')[1])
      }

      // chararter.skills.push(skill)
      skills.push(skill)
    })
    return skills
  }

  const chararter = {
    id: generateId(document.location.href),
    name: cleanText(document.querySelector('.ch-title h1').innerHTML),
    class: document.querySelector('.ch-class-con .class p').innerHTML,
    stars: Number.parseInt(document.querySelector('.stars img').src.split('star0')[1][0]),
    eddie: document.querySelectorAll('.skill-table-border-top').length === 7,
    awakenable: Boolean(document.querySelector('.awakenable-con')),
    talismans: getTalisman(),
    url: document.location.href,
    image: document.querySelector('.ch-postpage-thumb img').src,
    skills: getSkills()
  }

  function cleanText (text) {
    return text.replace('↵', '')
  }

  function parseType (type) {
    type = type.toLowerCase()
    if (type.includes('fury')) {
      return 'Fury'
    }
    if (type.includes('passive')) {
      return 'Passive'
    }
    if (type.includes('power')) {
      return 'Power'
    }
    if (type.includes('basic')) {
      return 'Basic'
    }
    console.warn('Type undefined!', type)
    return 'Undefined!'
  }

  console.log('chararter : ', chararter.name)
  return chararter
}

exports.parse = parse