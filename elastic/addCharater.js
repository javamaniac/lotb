var client = require('./connection.js')

// const character = {
//   'name': 'Aces High Eddie',
//   'url': 'http://www.news.maiden-lotb.com/n3/character-en/aces-high-eddie-gunner/',
//   'awakenable': false,
//   'class': 'Gunner',
//   'skills': [
//     {
//       'name': 'DO OR DIE',
//       'typeName': 'Past Basic Attack',
//       'type': 'Basic',
//       'desc': [
//         '• Deals physical damage to a single target.',
//         '• Removes One Beneficial Effect.',
//         '• Inflicts Permadeath on targets with Immortality, Endure, or Ghost effects.'
//       ]
//     },
//     {
//       'name': 'RELOAD\n',
//       'typeName': 'Past Power Attack',
//       'type': 'Power',
//       'desc': [
//         '• Gain Perfect Immunity for 2 turns.',
//         '• Gain Damage Reduction Shield for 2 turns.',
//         '• 35% Chance to gain an Extra Turn.'
//       ],
//       'powerCost': 4
//     },
//     {
//       'name': 'SHOOT\n',
//       'typeName': 'Present Basic Attack',
//       'type': 'Basic',
//       'desc': [
//         '• Deals physical damage to a single target.',
//         '• 25% Chance to Critically Strike.',
//         '• Remove Invincibility and Physical, Magic, and True Damage Invulnerability effects before dealing damage.',
//         '• Deal Additional True Damage for each beneficial effect on the target.'
//       ]
//     },
//     {
//       'name': 'TRIPLE SHOT\n',
//       'typeName': 'Present Power Attack',
//       'type': 'Power',
//       'desc': [
//         '• Deals 3 hits of physical damage to random targets.',
//         '• 20% Chance to gain an Extra Turn.',
//         '• Gain Critical Strike if a target is killed.',
//         '• Damage dealt increases based on your ATK and SPECIAL stats.'
//       ],
//       'powerCost': 5
//     },
//     {
//       'name': 'FLY TO LIVE\n',
//       'typeName': 'Future Basic Attack',
//       'type': 'Basic',
//       'desc': [
//         '• Deals physical damage to all enemies.',
//         '• 65% Chance to remove Perfect Immunity from all enemies.',
//         '• Inflict Curse, DEF Down, and Exhaust on the target for 1 turn.',
//         '• 20% Chance to grant an Extra Turn to each ally.'
//       ]
//     },
//     {
//       'name': 'GATHERING SPEED\n',
//       'typeName': 'Future Power Attack',
//       'type': 'Power',
//       'desc': [
//         '• Heal all allies based on their SPECIAL stat.',
//         '• Permanently increase the SPECIAL and ATK stat of all allies by 5%. Instantly gain an Extra Turn.'
//       ],
//       'powerCost': 5
//     },
//     {
//       'name': 'TRUE SHOT\n',
//       'typeName': 'Fury',
//       'type': 'Fury',
//       'desc': [
//         '• Deals 5 hits of physical damage to all enemies.',
//         '• 50% Chance to Critically Strike.',
//         '• Grants Guard Shield to all allies for 2 turns.',
//         '• Guard Shield reduces damage taken and increases Fury for every hit.'
//       ]
//     }
//   ]
// }

const addCharacter = (character) => {
  const getSkill = (type) => {
    const filtered = character.skills
      .filter(skill => skill.type === type)
    if (!filtered) {
      return []
    }
    const skills = []
    filtered.forEach((skill) => skills.push(...skill.desc))
    return skills
  
    return filtered.map(skill => skill.desc.join(' | '))
      .join(' | ')
  }

  const body =  {
    ...character,
    basicSkills: getSkill('Basic'),
    powerSkills: getSkill('Power'),
    passiveSkills: getSkill('Passive'),
    furySkills: getSkill('Fury')
  }

  // TODO diviser dans index document
  client.index({
    index: 'lotb-character',
    id: character.id,
    body
  }, function (err, resp, status) {
    console.log(resp)
  })  
}

module.exports = addCharacter;
