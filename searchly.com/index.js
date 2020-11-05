const { Client } = require('@elastic/elasticsearch')

var connectionstring = 'https://'
const client = new Client({ node: connectionstring })

async function addDoc(character) {

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

  const body = {
    ...character,
    basicSkills: getSkill('Basic'),
    powerSkills: getSkill('Power'),
    passiveSkills: getSkill('Passive'),
    furySkills: getSkill('Fury')
  }

  await client.index({
    index: 'lotb-character',
    id: character.id,
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body
  })

}

async function search(query) {
  query = query || {
    // name
    match: { 
      name: 'eddie' 
    }
    // all fields
    // query_string: {
    //   query: "damage"
    // }
  }


  // Let's search!
  const { body } = await client.search({
    index: 'lotb-character',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query
    }
  })

  console.log(body.hits.hits)
}

async function refreshIndex() {

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'lotb-character' })
}
// run().catch(console.log)

module.exports = {
  addDoc,
  refreshIndex,
  search
};