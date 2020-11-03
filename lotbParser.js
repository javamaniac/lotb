class LotbParser {
  constructor (height, width) {
    this.version = '0.0.1'
  }

  parse (element) {
    console.log('ici')
    const chararter = {
      name: cleanText(element.querySelector('.ch-title').innerText),
      skills: []
    }

    element.querySelectorAll('.skill-menu-container tr').forEach(skillrow => {
      const [, tdSkillName, tdSkillDesc] = skillrow.querySelectorAll('td')
      if (!tdSkillName) {
        return
      }

      const [skillName, skillType, textPowerCost] = tdSkillName.querySelector('td p')
        .innerText.split(/[()]/)

      const listeSkillDesc = tdSkillDesc.querySelector('td p')
        .innerText.split(/(\n|\.)/)

      const skill = {
        name: cleanText(skillName),
        typeName: skillType,
        type: parseType(skillType),
        desc: listeSkillDesc
      }

      if (textPowerCost) {
        skill.powerCost = Number.parseInt(textPowerCost.split(':')[1])
      }

      chararter.skills.push(skill)
    })

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

    // console.log(chararter)
    return chararter
  }
}

exports.LotbParser = new LotbParser()

const parse = () => {
  const chararter = {
    name: cleanText(document.querySelector('.ch-title h1').innerHTML),
    url: document.location.href,
    awakenable: Boolean(document.querySelector('.awakenable-con')),
    class: document.querySelector('.ch-class-con .class p').innerHTML,
    stars: Number.parseInt(document.querySelector('.stars img').src.split('star0')[1][0]),
    skills: []
  }

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

    chararter.skills.push(skill)
  })

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
