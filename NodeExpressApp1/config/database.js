const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

console.info(process.env.MONGODB);

mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/pdv')

module.exports = mongoose;