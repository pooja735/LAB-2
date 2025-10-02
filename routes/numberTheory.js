const express = require('express');
const router = express.Router();
const bigInt = require('big-integer');

// Prime Number Generation and Testing
router.post('/prime/generate', (req, res) => {
  try {
    const { bits } = req.body;
    const bitLength = parseInt(bits) || 16;
    
    if (bitLength > 32) {
      return res.status(400).json({ error: 'Bit length too large for demo purposes (max 32 bits)' });
    }
    
    if (bitLength < 4) {
      return res.status(400).json({ error: 'Bit length too small (min 4 bits)' });
    }

    const prime = generatePrime(bitLength);
    const isPrime = isPrimeNumber(prime);
    
    res.json({
      prime: prime.toString(),
      bitLength,
      isPrime,
      binary: prime.toString(2),
      hex: prime.toString(16)
    });
  } catch (error) {
    console.error('Prime Generation Error:', error);
    res.status(500).json({ error: 'Prime generation failed: ' + error.message });
  }
});

router.post('/prime/test', (req, res) => {
  try {
    const { number } = req.body;
    
    if (!number) {
      return res.status(400).json({ error: 'Number is required' });
    }

    const num = bigInt(number);
    const isPrime = isPrimeNumber(num);
    const factors = isPrime ? [number] : findFactors(num);
    
    res.json({
      number: number,
      isPrime,
      factors,
      bitLength: num.bitLength().toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modular Arithmetic
router.post('/modular/power', (req, res) => {
  try {
    const { base, exponent, modulus } = req.body;
    
    if (!base || !exponent || !modulus) {
      return res.status(400).json({ error: 'Base, exponent, and modulus are required' });
    }

    const result = bigInt(base).modPow(bigInt(exponent), bigInt(modulus));
    
    res.json({
      base,
      exponent,
      modulus,
      result: result.toString(),
      calculation: `${base}^${exponent} mod ${modulus} = ${result}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/modular/inverse', (req, res) => {
  try {
    const { number, modulus } = req.body;
    
    if (!number || !modulus) {
      return res.status(400).json({ error: 'Number and modulus are required' });
    }

    const num = bigInt(number);
    const mod = bigInt(modulus);
    
    try {
      const inverse = num.modInv(mod);
      const verification = num.multiply(inverse).mod(mod);
      
      res.json({
        number,
        modulus,
        inverse: inverse.toString(),
        verification: verification.toString(),
        isValid: verification.equals(1)
      });
    } catch (error) {
      res.json({
        number,
        modulus,
        inverse: null,
        error: 'Modular inverse does not exist (numbers are not coprime)'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GCD and Extended Euclidean Algorithm
router.post('/gcd', (req, res) => {
  try {
    const { a, b } = req.body;
    
    if (!a || !b) {
      return res.status(400).json({ error: 'Two numbers are required' });
    }

    const numA = parseInt(a);
    const numB = parseInt(b);
    
    // Calculate GCD using Euclidean algorithm
    const gcd = calculateGCD(numA, numB);
    
    // Extended Euclidean Algorithm
    const extended = extendedGCD(numA, numB);
    
    res.json({
      a,
      b,
      gcd: gcd.toString(),
      extended: {
        x: extended.x.toString(),
        y: extended.y.toString(),
        verification: (numA * extended.x + numB * extended.y).toString()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper Functions
function generatePrime(bits) {
  let candidate;
  let attempts = 0;
  const maxAttempts = 1000; // Prevent infinite loops
  
  do {
    candidate = bigInt.randBetween(bigInt(2).pow(bits - 1), bigInt(2).pow(bits));
    attempts++;
    
    if (attempts > maxAttempts) {
      // Fallback to a known prime if generation takes too long
      return bigInt(2).pow(bits).subtract(1);
    }
  } while (!isPrimeNumber(candidate));
  
  return candidate;
}

function isPrimeNumber(n) {
  if (n.lesserOrEquals(1)) return false;
  if (n.lesserOrEquals(3)) return true;
  if (n.mod(2).equals(0) || n.mod(3).equals(0)) return false;
  
  for (let i = bigInt(5); i.multiply(i).lesserOrEquals(n); i = i.add(6)) {
    if (n.mod(i).equals(0) || n.mod(i.add(2)).equals(0)) {
      return false;
    }
  }
  return true;
}

function findFactors(n) {
  const factors = [];
  for (let i = bigInt(2); i.multiply(i).lesserOrEquals(n); i = i.add(1)) {
    while (n.mod(i).equals(0)) {
      factors.push(i.toString());
      n = n.divide(i);
    }
  }
  if (n.greater(1)) {
    factors.push(n.toString());
  }
  return factors;
}

function calculateGCD(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function extendedGCD(a, b) {
  if (a === 0) {
    return { gcd: b, x: 0, y: 1 };
  }
  
  const result = extendedGCD(b % a, a);
  const x = result.y - Math.floor(b / a) * result.x;
  const y = result.x;
  
  return { gcd: result.gcd, x, y };
}

module.exports = router;
