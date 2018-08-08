const mongoose  = require('mongoose');
var Schema = mongoose.Schema;
const masterOneSchema = mongoose.Schema({
  number: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true }
}, { collection: 'master_one' });

module.exports= mongoose.model('MasterOne',masterOneSchema);
