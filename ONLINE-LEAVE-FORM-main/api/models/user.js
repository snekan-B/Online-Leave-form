const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  name: String,
  content: Buffer,
});

const PdfModel = mongoose.model('Pdf', pdfSchema);

module.exports = PdfModel;


