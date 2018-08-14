const mongoose  = require('mongoose');
var Schema = mongoose.Schema;
const reportTypeSchema = mongoose.Schema({
  report_type: { type: String, required: true },
  app_id: { type: Schema.Types.ObjectId, ref: 'MasterConfig' },
}, { collection: 'report_type' });

module.exports= mongoose.model('ReportType',reportTypeSchema);
