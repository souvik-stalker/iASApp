const mongoose  = require('mongoose');
var Schema = mongoose.Schema;
const lookupSchema = mongoose.Schema({
  config_data: { type: String, required: true },
  table_header: { type: String, required: true },
  hierarchy: { type: Number, required: true },
  app_id: { type: Schema.Types.ObjectId, ref: 'MasterOne' },
}, { collection: 'table_lookup' });

module.exports= mongoose.model('Lookup',lookupSchema);
