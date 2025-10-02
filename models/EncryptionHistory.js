const mongoose = require('mongoose');

const encryptionHistorySchema = new mongoose.Schema({
  algorithm: {
    type: String,
    required: true,
    enum: ['RSA', 'AES', 'SHA', 'MD5', 'EllipticCurve']
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: false
  },
  operation: {
    type: String,
    required: true,
    enum: ['encrypt', 'decrypt', 'hash', 'generate']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  parameters: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

module.exports = mongoose.model('EncryptionHistory', encryptionHistorySchema);
