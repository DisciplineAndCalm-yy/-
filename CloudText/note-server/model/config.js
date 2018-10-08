const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/note')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connetion success')
});

module.exports = db