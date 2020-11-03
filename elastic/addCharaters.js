const fs = require('fs')
const addCharater = require('./addCharater')

// const character = {
//   "name": "Alexander Eddie",
//   "url": "http://www.news.maiden-lotb.com/n3/character-en/alexander-eddie-warrior/",
//   "awakenable": false,
//   "class": "Warrior",
//   "skills": [
//     {
//       "name": "DOMINATION",
//       "typeName": "Past Basic Attack",
//       "type": "Basic",
//       "desc": [
//         "• Deals physical damage to all enemies.",
//         "• Grants Armor Penetration to all allies for 2 turns.",
//         "• 35% Chance to Ignite, Bleed, and Block Beneficial Effects on the enemy for 2 turns.",
//         "• Damage dealt increases based on the enemy’s and your MAX HP."
//       ]
//     },
//     {
//       "name": "PITCHED BATTLE\n",
//       "typeName": "Past Power Attack",
//       "type": "Power",
//       "desc": [
//         "• Deals physical damage to a single target.",
//         "• Lowers ATK and MAGIC of the target for the duration of the battle.",
//         "• Gain Increased ATK and MAX HP for the duration of the battle.",
//         "• Damage dealt increases based on the enemy’s and your MAX HP."
//       ],
//       "powerCost": 6
//     },
//     {
//       "name": "CONQUEROR'S PRICE\n",
//       "typeName": "Present Basic Attack",
//       "type": "Basic",
//       "desc": [
//         "• Deals physical damage to a single target.",
//         "• Steal One Beneficial effect, including Golden Effects, for each negative effect on the target.",
//         "• Damage dealt increases based on the enemy’s and your MAX HP"
//       ]
//     },
//     {
//       "name": "PAIN AND GLORY\n",
//       "typeName": "Present Power Attack",
//       "type": "Power",
//       "desc": [
//         "• Grants a Thorn Shield for 2 turns.",
//         "• Grants a Heal Shield for 2 turns.",
//         "• 70% Chance to Taunt all enemies for 2 turns.",
//         "• Instantly gain an Extra Turn."
//       ],
//       "powerCost": 6
//     },
//     {
//       "name": "ONWARD MARCH\n",
//       "typeName": "Future Basic Attack",
//       "type": "Basic",
//       "desc": [
//         "• Deals physical damage to a single target.",
//         "• Removes Immunity and Invincibility effects, including Golden Effects.",
//         "• Grant Perfect Immunity to all allies for 2 turns if an effect is removed.",
//         "• Damage dealt increases based on the enemy’s and your MAX HP."
//       ]
//     },
//     {
//       "name": "DEVASTATING STRIKE\n",
//       "typeName": "Future Power Attack",
//       "type": "Power",
//       "desc": [
//         "• Deals 30% of your MAX HP as physical damage to a single target.",
//         "• Heal all allies based on your MAX HP."
//       ],
//       "powerCost": 5
//     },
//     {
//       "name": "KING OF MEN\n",
//       "typeName": "Passive",
//       "type": "Passive",
//       "desc": [
//         "Immune to all negative effects, including Max HP reduction. This skill can only be countered by Passive Disable applied at the start of battle."
//       ]
//     }
//   ]
// }

// fs.readFile('./data/Wrath.json', 'utf8', (err, jsonString) => {
//   if (err) {
//     console.log("File read failed:", err)
//     return
//   }

//   try {
//     const character = JSON.parse(jsonString)
//     addCharater(character)    
//     console.log(character.name, 'indexed')
//   } catch (err) {
//     console.log('Error parsing JSON string:', err)
//   }

// })


// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}


; (async () => {
  console.time('index')
  for await (const f of getFiles('./data')) {
    console.log(f);

    fs.readFile(f, 'utf8', (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err)
        return
      }

      try {
        const character = JSON.parse(jsonString)
        addCharater(character)
        console.log(character.name, 'indexed')
      } catch (err) {
        console.log('Error parsing JSON string:', err)
      }

    })

  }
  console.timeEnd('index')
})()