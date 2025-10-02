const express = require('express');
const router = express.Router();
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const bigInt = require('big-integer');
const EncryptionHistory = require('../models/EncryptionHistory');

// RSA Encryption/Decryption
router.post('/rsa/encrypt', async (req, res) => {
  try {
    const { message, publicKey } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let key;
    if (publicKey) {
      // Use provided public key
      key = new NodeRSA();
      key.importKey(publicKey, 'public');
    } else {
      // Generate new key pair
      key = new NodeRSA({ b: 1024 });
    }
    
    const encrypted = key.encrypt(message, 'base64');
    
    // Save to history
    try {
      await EncryptionHistory.create({
        algorithm: 'RSA',
        input: message,
        output: encrypted,
        key: publicKey || key.exportKey('public'),
        operation: 'encrypt'
      });
    } catch (dbError) {
      console.log('Database save error (non-critical):', dbError.message);
    }

    res.json({ 
      encrypted, 
      publicKey: key.exportKey('public'),
      privateKey: key.exportKey('private')
    });
  } catch (error) {
    console.error('RSA Encryption Error:', error);
    res.status(500).json({ error: 'Encryption failed: ' + error.message });
  }
});

router.post('/rsa/decrypt', async (req, res) => {
  try {
    const { encryptedMessage, privateKey } = req.body;
    
    if (!encryptedMessage || !privateKey) {
      return res.status(400).json({ error: 'Encrypted message and private key are required' });
    }

    const key = new NodeRSA();
    key.importKey(privateKey, 'private');
    
    const decrypted = key.decrypt(encryptedMessage, 'utf8');
    
    // Save to history
    try {
      await EncryptionHistory.create({
        algorithm: 'RSA',
        input: encryptedMessage,
        output: decrypted,
        key: privateKey,
        operation: 'decrypt'
      });
    } catch (dbError) {
      console.log('Database save error (non-critical):', dbError.message);
    }

    res.json({ decrypted });
  } catch (error) {
    console.error('RSA Decryption Error:', error);
    res.status(500).json({ error: 'Decryption failed: ' + error.message });
  }
});

// Generate RSA Key Pair
router.get('/rsa/generate-keys', async (req, res) => {
  try {
    const key = new NodeRSA({ b: 1024 });
    
    const publicKey = key.exportKey('public');
    const privateKey = key.exportKey('private');
    
    res.json({ publicKey, privateKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hash Functions
router.post('/hash', async (req, res) => {
  try {
    const { message, algorithm } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const validAlgorithms = ['sha256', 'sha512', 'md5'];
    const hashAlgorithm = validAlgorithms.includes(algorithm) ? algorithm : 'sha256';
    
    const hash = crypto.createHash(hashAlgorithm).update(message).digest('hex');
    
    // Save to history
    try {
      await EncryptionHistory.create({
        algorithm: hashAlgorithm.toUpperCase(),
        input: message,
        output: hash,
        operation: 'hash',
        parameters: { algorithm: hashAlgorithm }
      });
    } catch (dbError) {
      console.log('Database save error (non-critical):', dbError.message);
    }

    res.json({ 
      hash, 
      algorithm: hashAlgorithm,
      input: message 
    });
  } catch (error) {
    console.error('Hash Error:', error);
    res.status(500).json({ error: 'Hash generation failed: ' + error.message });
  }
});

// Get encryption history
router.get('/history', async (req, res) => {
  try {
    const history = await EncryptionHistory.find()
      .sort({ timestamp: -1 })
      .limit(50);
    
    res.json(history);
  } catch (error) {
    console.error('History Error:', error);
    // Return empty array if database is not available
    res.json([]);
  }
});

module.exports = router;
