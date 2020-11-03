var elasticsearch = require('elasticsearch')

// https://www.compose.com/articles/getting-started-with-elasticsearch-and-node/

var client = new elasticsearch.Client({
  hosts: [
    'http://localhost:9200/'
    // 'https://[username]:[password]@[server]:[port]/',
    // 'https://[username]:[password]@[server]:[port]/'
  ]
})

module.exports = client;
