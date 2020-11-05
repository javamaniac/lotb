const { addDoc, search, refreshIndex } = require('./index')

const character = {
  "id": "angel-eddie-gunner",
  "name": "Angel Eddie",
  "class": "Gunner",
  "stars": 5,
  "eddie": true,
  "awakenable": false,
  "talismans": "GGS...",
  "url": "http://www.news.maiden-lotb.com/n3/character-en/angel-eddie-gunner/",
  "image": "http://www.news.maiden-lotb.com/n3/wp-content/uploads/2020/06/hud_icon_eddie_angel.png",
  "skills": [
    {
      "name": "RING OF REASON",
      "typeName": "Past Basic Attack",
      "type": "Basic",
      "desc": [
        "• Deals random damage to a single target.",
        "• Remove Damage Invulnerability Effects, including Vanish and Invincibility, from the target.",
        "• 35% Chance to inflict Stun on the target for 1 turn.",
        "• 35% Chance to inflict Blind on the target for 1 turn.",
        "• 35% Chance to inflict Stop on the target for 1 turn.",
        "• Damage dealt increased based on your DEF and MR stats."
      ]
    },
    {
      "name": "GATES OF HEAVEN\n",
      "typeName": "Past Power Attack",
      "type": "Power",
      "desc": [
        "• Heal all allies based on your MISSING HP.",
        "• Remove Vanish and Invincibility from all enemies.",
        "• 35% Chance to inflict Perfect Corruption for 2 turns.",
        "• Instantly gain an Extra Turn."
      ],
      "powerCost": 6
    },
    {
      "name": "SAVIOR\n",
      "typeName": "Present Basic Attack",
      "type": "Basic",
      "desc": [
        "• Deals random damage to a single target.",
        "• Steal 1 Beneficial Effect, including Golden Effects, from the target.",
        "• Lower DEF and MR of the target for 1 turn.",
        "• 45% Chance to Inflict Lower ATK, MAGIC, and Taunt on the target for 2 turns.",
        "• Damage dealt increased based on your DEF and MR stats."
      ]
    },
    {
      "name": "GUILTY CONSCIENCE\n",
      "typeName": "Present Power Attack",
      "type": "Power",
      "desc": [
        "• Deals random damage to all enemies.",
        "• Remove Silver Effects from all allies.",
        "• Grant Cleanse and Trap to all allies for 2 turns.",
        "•Inflict Perfect Accuracy Down on the target for 3 turns.",
        "• Instantly gain an Extra Turn"
      ],
      "powerCost": 6
    },
    {
      "name": "KINGDOM COME\n",
      "typeName": "Future Basic Attack",
      "type": "Basic",
      "desc": [
        "• Deals random damage to all enemies.",
        "• 75% Chance to grant Perfect Hit to each ally for 2 turns.",
        "• Increase Accuracy of all allies for 2 turns.",
        "• Damage dealt increased based on your DEF and MR stats."
      ]
    },
    {
      "name": "DIVINE INTERVENTION\n",
      "typeName": "Future Power Attack",
      "type": "Power",
      "desc": [
        "• Revive up to 2 dead allies.",
        "• Grant Perfect Immortality to all allies for 2 turns.",
        "• Grant Perfect Titan Shield to all allies for 2 turns."
      ],
      "powerCost": 6
    },
    {
      "name": "GUARDIAN ANGEL\n",
      "typeName": "Passive",
      "type": "Passive",
      "desc": [
        "Prevent all enemies from gaining Immunity effects. Grant Immunity or Perfect Immunity to each ally at Start of battle for 1 turn. Gain Perfect Heal Shield for self and grant Void Shield and 2 stacks of HP Regen to all allies for 2 turns when you reach 1 HP."
      ]
    }
  ]
}

// addDoc(character).catch(console.log)


// https://stackoverflow.com/questions/34147471/elasticsearch-how-to-search-for-a-value-in-any-field-across-all-types-in-one
// search name
search({
  // name
  match: { 
    name: 'eddie' 
  }
}).catch(console.log)


// search all fields
// search({
//   query_string: {
//       query: "damage"
//     }
// }).catch(console.log)
