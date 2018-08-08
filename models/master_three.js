const mongoose  = require('mongoose');

const masterThreeSchema = mongoose.Schema({
  parent: { type: String, required: true },
  number: { type: String, required: true },
  name:{ type: String, required: true },
  owner: { type: String }
}, { collection: 'master_three' });

module.exports= mongoose.model('MasterThree',masterThreeSchema);
