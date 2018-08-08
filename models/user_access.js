const mongoose  = require('mongoose');
var Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
  email: { type: String, required: true },
  level:{ type: String, required: true },
  hierarchy: { type: Number, required: true },
  master_one_id: { type: Schema.Types.ObjectId, ref: 'MasterOne' },
  master_two_id: { type: Schema.Types.ObjectId, ref: 'MasterTwo' },
  hierchey: { type: Schema.Types.ObjectId, ref: 'Lookup' },
}, { collection: 'user_access' });

module.exports= mongoose.model('UserAccess',postSchema);
