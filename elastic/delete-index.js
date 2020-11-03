var client = require('./connection.js')

client.indices.delete({
  index: 'lotb-character'
}, function (err, resp, status) {
  if (err) {
    console.log(err)
  } else {
    console.log('delete', resp)
  }
})
