const mongoose  = require('mongoose');

const masterTwoSchema = mongoose.Schema({
  parent: { type: String, required: true },
  number: { type: String, required: true },
  name:{ type: String, required: true },
  owner: { type: String }
}, { collection: 'master_two' });

module.exports= mongoose.model('MasterTwo',masterTwoSchema);
