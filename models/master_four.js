const mongoose  = require('mongoose');

const masterFourSchema = mongoose.Schema({
  gparent: { type: String, required: true },
  parent: { type: String, required: true },
  name:{ type: String, required: true }
}, { collection: 'master_four' });

module.exports= mongoose.model('MasterFour',masterFourSchema);
