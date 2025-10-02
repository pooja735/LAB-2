import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const PrimeContainer = styled.div`
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VisualizationContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const NumberWheel = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  position: relative;
  margin: 2rem auto;
`;

const WheelNumber = styled.div`
  position: absolute;
  color: white;
  font-weight: 600;
  transform: translate(-50%, -50%);
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

const PrimeNumbers = () => {
  const [inputNumber, setInputNumber] = useState('');
  const [primeResult, setPrimeResult] = useState(null);
  const [modularNumber, setModularNumber] = useState('');
  const [modularModulus, setModularModulus] = useState('');
  const [modularResult, setModularResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPrime = async () => {
    if (!inputNumber) {
      alert('Please enter a number');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/number-theory/prime/test', {
        number: inputNumber
      });
      setPrimeResult(response.data);
    } catch (error) {
      console.error('Error checking prime:', error);
      alert('Error checking prime: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const calculateModularInverse = async () => {
    if (!modularNumber || !modularModulus) {
      alert('Please enter number and modulus');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/number-theory/modular/inverse', {
        number: modularNumber,
        modulus: modularModulus
      });
      setModularResult(response.data);
    } catch (error) {
      console.error('Error calculating modular inverse:', error);
      alert('Error calculating modular inverse: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const generateModularTable = (modulus) => {
    if (!modulus || modulus < 2) return [];
    
    const table = [];
    for (let i = 0; i < modulus; i++) {
      const row = [];
      for (let j = 0; j < modulus; j++) {
        row.push((i + j) % modulus);
      }
      table.push(row);
    }
    return table;
  };

  const generateNumberWheel = (modulus) => {
    if (!modulus || modulus < 2) return [];
    
    const numbers = [];
    for (let i = 0; i < modulus; i++) {
      const angle = (i * 360) / modulus;
      const x = 100 + 80 * Math.cos((angle - 90) * Math.PI / 180);
      const y = 100 + 80 * Math.sin((angle - 90) * Math.PI / 180);
      numbers.push({ value: i, x, y });
    }
    return numbers;
  };

  const findNextPrime = (num) => {
    let next = parseInt(num) + 1;
    while (true) {
      let isPrime = true;
      for (let i = 2; i <= Math.sqrt(next); i++) {
        if (next % i === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) return next;
      next++;
    }
  };

  return (
    <PrimeContainer>
      <PageTitle>Prime Numbers & Modular Arithmetic</PageTitle>
      
      <GridContainer>
        <Section>
          <SectionTitle>🔢 Prime Number Analysis</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Enter a number to check if it's prime, find its factors, and discover the next prime number.
          </p>
          
          <InputGroup>
            <Label>Enter a Number:</Label>
            <Input
              type="number"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder="Enter a number..."
              min="2"
            />
          </InputGroup>
          
          <Button onClick={checkPrime} disabled={loading}>
            {loading && <LoadingSpinner />}
            Check Prime
          </Button>
          
          {primeResult && (
            <ResultBox>
              <strong>Analysis Results:</strong><br />
              <div style={{ marginTop: '0.5rem' }}>
                <div>Number: {primeResult.number}</div>
                <div>Is Prime: {primeResult.isPrime ? '✅ Yes' : '❌ No'}</div>
                <div>Bit Length: {primeResult.bitLength}</div>
                {primeResult.factors && (
                  <div>Prime Factors: {primeResult.factors.join(' × ')}</div>
                )}
                <div>Next Prime: {findNextPrime(primeResult.number)}</div>
              </div>
            </ResultBox>
          )}
        </Section>

        <Section>
          <SectionTitle>🔄 Modular Arithmetic</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Calculate modular multiplicative inverse and explore modular arithmetic operations.
          </p>
          
          <InputGroup>
            <Label>Number:</Label>
            <Input
              type="number"
              value={modularNumber}
              onChange={(e) => setModularNumber(e.target.value)}
              placeholder="Enter number..."
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Modulus:</Label>
            <Input
              type="number"
              value={modularModulus}
              onChange={(e) => setModularModulus(e.target.value)}
              placeholder="Enter modulus..."
              min="2"
            />
          </InputGroup>
          
          <Button onClick={calculateModularInverse} disabled={loading}>
            {loading && <LoadingSpinner />}
            Calculate Inverse
          </Button>
          
          {modularResult && (
            <ResultBox>
              <strong>Modular Inverse Result:</strong><br />
              <div style={{ marginTop: '0.5rem' }}>
                {modularResult.inverse ? (
                  <>
                    <div>Number: {modularResult.number}</div>
                    <div>Modulus: {modularResult.modulus}</div>
                    <div>Inverse: {modularResult.inverse}</div>
                    <div>Verification: {modularResult.verification}</div>
                    <div>Valid: {modularResult.isValid ? '✅ Yes' : '❌ No'}</div>
                  </>
                ) : (
                  <div style={{ color: '#ff6b6b' }}>{modularResult.error}</div>
                )}
              </div>
            </ResultBox>
          )}
        </Section>
      </GridContainer>

      <Section>
        <SectionTitle>📊 Modular Arithmetic Visualization</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Interactive visualizations of modular arithmetic operations.
        </p>
        
        <GridContainer>
          <VisualizationContainer>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Modular Addition Table (mod {modularModulus || 'n'})</h3>
            {modularModulus && parseInt(modularModulus) >= 2 && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  borderCollapse: 'collapse', 
                  width: '100%',
                  color: 'white',
                  fontSize: '0.9rem'
                }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem' }}>+</th>
                      {Array.from({ length: parseInt(modularModulus) }, (_, i) => (
                        <th key={i} style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem' }}>
                          {i}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {generateModularTable(parseInt(modularModulus)).map((row, i) => (
                      <tr key={i}>
                        <th style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem' }}>
                          {i}
                        </th>
                        {row.map((cell, j) => (
                          <td key={j} style={{ 
                            border: '1px solid rgba(255,255,255,0.3)', 
                            padding: '0.5rem',
                            textAlign: 'center'
                          }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </VisualizationContainer>

          <VisualizationContainer>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Number Wheel (mod {modularModulus || 'n'})</h3>
            {modularModulus && parseInt(modularModulus) >= 2 && (
              <NumberWheel>
                {generateNumberWheel(parseInt(modularModulus)).map((num, index) => (
                  <WheelNumber
                    key={index}
                    style={{
                      left: `${num.x}px`,
                      top: `${num.y}px`
                    }}
                  >
                    {num.value}
                  </WheelNumber>
                ))}
              </NumberWheel>
            )}
            <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              Each number represents a remainder class modulo {modularModulus || 'n'}
            </div>
          </VisualizationContainer>
        </GridContainer>
      </Section>

      <Section>
        <SectionTitle>📚 Mathematical Concepts</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <p><strong>Prime Numbers:</strong> Natural numbers greater than 1 that have no positive divisors other than 1 and themselves.</p>
          <br />
          <p><strong>Modular Arithmetic:</strong> A system of arithmetic for integers where numbers "wrap around" after reaching a certain value (the modulus).</p>
          <br />
          <p><strong>Modular Multiplicative Inverse:</strong> For integers a and m, the inverse is an integer x such that a × x ≡ 1 (mod m).</p>
          <br />
          <p><strong>Applications:</strong> Prime numbers are fundamental in cryptography, while modular arithmetic is used in RSA encryption, hash functions, and digital signatures.</p>
        </div>
      </Section>
    </PrimeContainer>
  );
};

export default PrimeNumbers;
