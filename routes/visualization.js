const express = require('express');
const router = express.Router();

// Generate data for RSA key size visualization
router.get('/rsa/key-sizes', (req, res) => {
  try {
    const keySizes = [512, 1024, 2048, 4096];
    const data = keySizes.map(size => ({
      keySize: size,
      securityLevel: getSecurityLevel(size),
      recommended: size >= 2048,
      estimatedTime: getEstimatedTime(size)
    }));
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate prime number distribution data
router.get('/primes/distribution', (req, res) => {
  try {
    const { start = 1, end = 100 } = req.query;
    const primes = [];
    
    for (let i = parseInt(start); i <= parseInt(end); i++) {
      if (isPrime(i)) {
        primes.push({
          number: i,
          isPrime: true,
          position: primes.length + 1
        });
      }
    }
    
    res.json({
      range: { start: parseInt(start), end: parseInt(end) },
      primes,
      count: primes.length,
      density: primes.length / (parseInt(end) - parseInt(start) + 1)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate modular arithmetic visualization data
router.get('/modular/cycle', (req, res) => {
  try {
    const { base = 2, modulus = 7 } = req.query;
    const cycle = [];
    const seen = new Set();
    let current = 1;
    let power = 0;
    
    while (!seen.has(current)) {
      seen.add(current);
      cycle.push({
        power,
        value: current,
        calculation: `${base}^${power} mod ${modulus} = ${current}`
      });
      current = (current * parseInt(base)) % parseInt(modulus);
      power++;
    }
    
    res.json({
      base: parseInt(base),
      modulus: parseInt(modulus),
      cycle,
      cycleLength: cycle.length,
      isPrimitive: cycle.length === parseInt(modulus) - 1
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate elliptic curve points
router.get('/elliptic-curve/points', (req, res) => {
  try {
    const { a = 1, b = 1, p = 23 } = req.query;
    const points = [];
    
    for (let x = 0; x < parseInt(p); x++) {
      const ySquared = (Math.pow(x, 3) + parseInt(a) * x + parseInt(b)) % parseInt(p);
      
      for (let y = 0; y < parseInt(p); y++) {
        if ((y * y) % parseInt(p) === ySquared) {
          points.push({ x, y });
        }
      }
    }
    
    res.json({
      curve: { a: parseInt(a), b: parseInt(b), p: parseInt(p) },
      points,
      pointCount: points.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate hash collision visualization data
router.get('/hash/collision', (req, res) => {
  try {
    const { algorithm = 'md5', inputLength = 4 } = req.query;
    const crypto = require('crypto');
    const hashes = new Map();
    const collisions = [];
    
    // Generate random strings and find collisions
    for (let i = 0; i < 1000; i++) {
      const input = generateRandomString(parseInt(inputLength));
      const hash = crypto.createHash(algorithm).update(input).digest('hex');
      
      if (hashes.has(hash)) {
        collisions.push({
          hash,
          inputs: [hashes.get(hash), input],
          collisionNumber: collisions.length + 1
        });
      } else {
        hashes.set(hash, input);
      }
    }
    
    res.json({
      algorithm,
      totalInputs: 1000,
      uniqueHashes: hashes.size,
      collisions,
      collisionRate: collisions.length / 1000
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper functions
function getSecurityLevel(keySize) {
  if (keySize < 1024) return 'Weak';
  if (keySize < 2048) return 'Moderate';
  if (keySize < 4096) return 'Strong';
  return 'Very Strong';
}

function getEstimatedTime(keySize) {
  const times = {
    512: 'Minutes',
    1024: 'Hours',
    2048: 'Years',
    4096: 'Centuries'
  };
  return times[keySize] || 'Unknown';
}

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = router;
