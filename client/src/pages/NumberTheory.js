import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const NumberTheoryContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: white;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  color: white;
  font-family: 'Fira Code', monospace;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NumberTheory = () => {
  const [primeBits, setPrimeBits] = useState(16);
  const [primeNumber, setPrimeNumber] = useState('');
  const [testNumber, setTestNumber] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modular Arithmetic States
  const [modBase, setModBase] = useState('');
  const [modExponent, setModExponent] = useState('');
  const [modModulus, setModModulus] = useState('');
  const [modResult, setModResult] = useState(null);

  const [modInvNumber, setModInvNumber] = useState('');
  const [modInvModulus, setModInvModulus] = useState('');
  const [modInvResult, setModInvResult] = useState(null);

  // GCD States
  const [gcdA, setGcdA] = useState('');
  const [gcdB, setGcdB] = useState('');
  const [gcdResult, setGcdResult] = useState(null);

  const generatePrime = async () => {
    setLoading(true);
    try {
      const response = await api.post('/number-theory/prime/generate', {
        bits: primeBits
      });
      setPrimeNumber(response.data);
    } catch (error) {
      console.error('Error generating prime:', error);
      alert('Error generating prime: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const testPrime = async () => {
    if (!testNumber) {
      alert('Please enter a number to test');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/number-theory/prime/test', {
        number: testNumber
      });
      setTestResult(response.data);
    } catch (error) {
      console.error('Error testing prime:', error);
      alert('Error testing prime: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const calculateModularPower = async () => {
    if (!modBase || !modExponent || !modModulus) {
      alert('Please enter base, exponent, and modulus');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/number-theory/modular/power', {
        base: modBase,
        exponent: modExponent,
        modulus: modModulus
      });
      setModResult(response.data);
    } catch (error) {
      console.error('Error calculating modular power:', error);
      alert('Error calculating modular power: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const calculateModularInverse = async () => {
    if (!modInvNumber || !modInvModulus) {
      alert('Please enter number and modulus');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/number-theory/modular/inverse', {
        number: modInvNumber,
        modulus: modInvModulus
      });
      setModInvResult(response.data);
    } catch (error) {
      console.error('Error calculating modular inverse:', error);
      alert('Error calculating modular inverse: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const calculateGCD = async () => {
    if (!gcdA || !gcdB) {
      alert('Please enter two numbers');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/number-theory/gcd', {
        a: gcdA,
        b: gcdB
      });
      setGcdResult(response.data);
    } catch (error) {
      console.error('Error calculating GCD:', error);
      alert('Error calculating GCD: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  return (
    <NumberTheoryContainer>
      <PageTitle>Number Theory Calculator</PageTitle>
      
      <GridContainer>
        <Section>
          <SectionTitle>🔢 Prime Number Generation</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Generate cryptographically secure prime numbers of specified bit length.
          </p>
          
          <InputGroup>
            <Label>Bit Length:</Label>
            <Input
              type="number"
              value={primeBits}
              onChange={(e) => setPrimeBits(parseInt(e.target.value))}
              min="8"
              max="32"
            />
          </InputGroup>
          
          <Button onClick={generatePrime} disabled={loading}>
            {loading && <LoadingSpinner />}
            Generate Prime
          </Button>
          
          {primeNumber && (
            <ResultBox>
              <strong>Generated Prime:</strong><br />
              <div style={{ marginTop: '0.5rem' }}>
                <div>Decimal: {primeNumber.prime}</div>
                <div>Binary: {primeNumber.binary}</div>
                <div>Hexadecimal: {primeNumber.hex}</div>
                <div>Bit Length: {primeNumber.bitLength}</div>
                <div>Is Prime: {primeNumber.isPrime ? '✓ Yes' : '✗ No'}</div>
              </div>
            </ResultBox>
          )}
        </Section>

        <Section>
          <SectionTitle>🧪 Prime Number Testing</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Test if a number is prime and find its prime factors.
          </p>
          
          <InputGroup>
            <Label>Number to Test:</Label>
            <Input
              type="text"
              value={testNumber}
              onChange={(e) => setTestNumber(e.target.value)}
              placeholder="Enter a number..."
            />
          </InputGroup>
          
          <Button onClick={testPrime} disabled={loading}>
            {loading && <LoadingSpinner />}
            Test Prime
          </Button>
          
          {testResult && (
            <ResultBox>
              <strong>Test Results:</strong><br />
              <div style={{ marginTop: '0.5rem' }}>
                <div>Number: {testResult.number}</div>
                <div>Is Prime: {testResult.isPrime ? '✓ Yes' : '✗ No'}</div>
                <div>Bit Length: {testResult.bitLength}</div>
                {testResult.factors && (
                  <div>Prime Factors: {testResult.factors.join(' × ')}</div>
                )}
              </div>
            </ResultBox>
          )}
        </Section>
      </GridContainer>

      <GridContainer>
        <Section>
          <SectionTitle>⚡ Modular Exponentiation</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Calculate base^exponent mod modulus efficiently using modular arithmetic.
          </p>
          
          <InputGroup>
            <Label>Base:</Label>
            <Input
              type="text"
              value={modBase}
              onChange={(e) => setModBase(e.target.value)}
              placeholder="Enter base..."
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Exponent:</Label>
            <Input
              type="text"
              value={modExponent}
              onChange={(e) => setModExponent(e.target.value)}
              placeholder="Enter exponent..."
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Modulus:</Label>
            <Input
              type="text"
              value={modModulus}
              onChange={(e) => setModModulus(e.target.value)}
              placeholder="Enter modulus..."
            />
          </InputGroup>
          
          <Button onClick={calculateModularPower} disabled={loading}>
            {loading && <LoadingSpinner />}
            Calculate
          </Button>
          
          {modResult && (
            <ResultBox>
              <strong>Result:</strong><br />
              <div style={{ marginTop: '0.5rem' }}>
                <div>{modResult.calculation}</div>
                <div>Result: {modResult.result}</div>
              </div>
            </ResultBox>
          )}
        </Section>

        <Section>
          <SectionTitle>🔄 Modular Multiplicative Inverse</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Find the modular multiplicative inverse of a number modulo n.
          </p>
          
          <InputGroup>
            <Label>Number:</Label>
            <Input
              type="text"
              value={modInvNumber}
              onChange={(e) => setModInvNumber(e.target.value)}
              placeholder="Enter number..."
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Modulus:</Label>
            <Input
              type="text"
              value={modInvModulus}
              onChange={(e) => setModInvModulus(e.target.value)}
              placeholder="Enter modulus..."
            />
          </InputGroup>
          
          <Button onClick={calculateModularInverse} disabled={loading}>
            {loading && <LoadingSpinner />}
            Calculate Inverse
          </Button>
          
          {modInvResult && (
            <ResultBox>
              <strong>Result:</strong><br />
              <div style={{ marginTop: '0.5rem' }}>
                {modInvResult.inverse ? (
                  <>
                    <div>Inverse: {modInvResult.inverse}</div>
                    <div>Verification: {modInvResult.verification}</div>
                    <div>Valid: {modInvResult.isValid ? '✓ Yes' : '✗ No'}</div>
                  </>
                ) : (
                  <div style={{ color: '#ff6b6b' }}>{modInvResult.error}</div>
                )}
              </div>
            </ResultBox>
          )}
        </Section>
      </GridContainer>

      <Section>
        <SectionTitle>🔗 Greatest Common Divisor (GCD)</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Calculate GCD using Euclidean algorithm and find Bézout coefficients using Extended Euclidean algorithm.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <InputGroup>
            <Label>First Number (a):</Label>
            <Input
              type="text"
              value={gcdA}
              onChange={(e) => setGcdA(e.target.value)}
              placeholder="Enter first number..."
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Second Number (b):</Label>
            <Input
              type="text"
              value={gcdB}
              onChange={(e) => setGcdB(e.target.value)}
              placeholder="Enter second number..."
            />
          </InputGroup>
        </div>
        
        <Button onClick={calculateGCD} disabled={loading}>
          {loading && <LoadingSpinner />}
          Calculate GCD
        </Button>
        
        {gcdResult && (
          <ResultBox>
            <strong>GCD Results:</strong><br />
            <div style={{ marginTop: '0.5rem' }}>
              <div>Numbers: {gcdResult.a} and {gcdResult.b}</div>
              <div>GCD: {gcdResult.gcd}</div>
              <div>Bézout Coefficients:</div>
              <div style={{ marginLeft: '1rem' }}>
                <div>x = {gcdResult.extended.x}</div>
                <div>y = {gcdResult.extended.y}</div>
                <div>Verification: {gcdResult.a} × {gcdResult.extended.x} + {gcdResult.b} × {gcdResult.extended.y} = {gcdResult.extended.verification}</div>
              </div>
            </div>
          </ResultBox>
        )}
      </Section>

      <Section>
        <SectionTitle>📚 Number Theory Concepts</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <p><strong>Prime Numbers:</strong> Natural numbers greater than 1 that have no positive divisors other than 1 and themselves.</p>
          <br />
          <p><strong>Modular Arithmetic:</strong> A system of arithmetic for integers where numbers "wrap around" after reaching a certain value (the modulus).</p>
          <br />
          <p><strong>Modular Exponentiation:</strong> Computing a^b mod m efficiently using the binary exponentiation method.</p>
          <br />
          <p><strong>Modular Multiplicative Inverse:</strong> For integers a and m, the inverse is an integer x such that a × x ≡ 1 (mod m).</p>
          <br />
          <p><strong>Greatest Common Divisor (GCD):</strong> The largest positive integer that divides two numbers without leaving a remainder.</p>
          <br />
          <p><strong>Extended Euclidean Algorithm:</strong> Finds integers x and y such that ax + by = gcd(a,b) (Bézout's identity).</p>
        </div>
      </Section>
    </NumberTheoryContainer>
  );
};

export default NumberTheory;
