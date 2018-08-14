const mongoose  = require('mongoose');
var Schema = mongoose.Schema;
const pdfDataSchema = mongoose.Schema({
  report_type_id: { type: Schema.Types.ObjectId, ref: 'ReportType' },
  name: { type: String },
  base64value: { type: String },
}, { collection: 'pdf_data' });

module.exports= mongoose.model('PdfData',pdfDataSchema);
