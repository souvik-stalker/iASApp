const mongoose  = require('mongoose');

const masterConfigSchema = mongoose.Schema({
  appname: { type: String, required: true },
  config_name:{ type: String, required: true },
  config_entry: { type: String, required: true }
}, { collection: 'master_config' });

module.exports= mongoose.model('MasterConfig',masterConfigSchema);
