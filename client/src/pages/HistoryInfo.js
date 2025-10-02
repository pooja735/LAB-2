import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const HistoryContainer = styled.div`
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

const Card = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  color: #e0e7ff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const InteractiveExample = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: white;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(102, 126, 234, 0.4);
  }
`;

const ResultBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  margin-top: 0.5rem;
  color: white;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const HistoryInfo = () => {
  const [gcdA, setGcdA] = useState('');
  const [gcdB, setGcdB] = useState('');
  const [gcdResult, setGcdResult] = useState(null);
  
  const [modularBase, setModularBase] = useState('');
  const [modularExponent, setModularExponent] = useState('');
  const [modularModulus, setModularModulus] = useState('');
  const [modularResult, setModularResult] = useState(null);
  
  const [totientNumber, setTotientNumber] = useState('');
  const [totientResult, setTotientResult] = useState(null);

  const calculateGCD = async () => {
    if (!gcdA || !gcdB) {
      alert('Please enter two numbers');
      return;
    }
    
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
  };

  const calculateModularPower = async () => {
    if (!modularBase || !modularExponent || !modularModulus) {
      alert('Please enter base, exponent, and modulus');
      return;
    }
    
    try {
      const response = await api.post('/number-theory/modular/power', {
        base: modularBase,
        exponent: modularExponent,
        modulus: modularModulus
      });
      setModularResult(response.data);
    } catch (error) {
      console.error('Error calculating modular power:', error);
      alert('Error calculating modular power: ' + (error.response?.data?.error || error.message));
    }
  };

  const calculateTotient = (n) => {
    let result = n;
    for (let p = 2; p * p <= n; p++) {
      if (n % p === 0) {
        while (n % p === 0) {
          n /= p;
        }
        result -= result / p;
      }
    }
    if (n > 1) {
      result -= result / n;
    }
    return result;
  };

  const handleTotientCalculation = () => {
    if (!totientNumber) {
      alert('Please enter a number');
      return;
    }
    
    const num = parseInt(totientNumber);
    const totient = calculateTotient(num);
    setTotientResult({ number: num, totient });
  };

  return (
    <HistoryContainer>
      <PageTitle>History & Educational Information</PageTitle>
      
      <Section>
        <SectionTitle>📚 Number Theory Concepts</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
          Learn about fundamental concepts in number theory that form the basis of modern cryptography.
        </p>
        
        <GridContainer>
          <Card>
            <CardTitle>🔗 Greatest Common Divisor (GCD)</CardTitle>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              The GCD of two integers is the largest positive integer that divides both numbers without leaving a remainder.
            </p>
            
            <InteractiveExample>
              <InputGroup>
                <Label>Enter two numbers:</Label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Input
                    type="number"
                    value={gcdA}
                    onChange={(e) => setGcdA(e.target.value)}
                    placeholder="First number"
                  />
                  <Input
                    type="number"
                    value={gcdB}
                    onChange={(e) => setGcdB(e.target.value)}
                    placeholder="Second number"
                  />
                </div>
              </InputGroup>
              <Button onClick={calculateGCD}>Calculate GCD</Button>
              
              {gcdResult && (
                <ResultBox>
                  <div>GCD({gcdResult.a}, {gcdResult.b}) = {gcdResult.gcd}</div>
                  <div>Bézout coefficients: x = {gcdResult.extended.x}, y = {gcdResult.extended.y}</div>
                  <div>Verification: {gcdResult.a} × {gcdResult.extended.x} + {gcdResult.b} × {gcdResult.extended.y} = {gcdResult.extended.verification}</div>
                </ResultBox>
              )}
            </InteractiveExample>
          </Card>

          <Card>
            <CardTitle>⚡ Modular Arithmetic</CardTitle>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Modular arithmetic is arithmetic performed on integers where numbers "wrap around" after reaching a certain value.
            </p>
            
            <InteractiveExample>
              <InputGroup>
                <Label>Modular Exponentiation:</Label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Input
                    type="number"
                    value={modularBase}
                    onChange={(e) => setModularBase(e.target.value)}
                    placeholder="Base"
                    style={{ flex: '1', minWidth: '80px' }}
                  />
                  <Input
                    type="number"
                    value={modularExponent}
                    onChange={(e) => setModularExponent(e.target.value)}
                    placeholder="Exponent"
                    style={{ flex: '1', minWidth: '80px' }}
                  />
                  <Input
                    type="number"
                    value={modularModulus}
                    onChange={(e) => setModularModulus(e.target.value)}
                    placeholder="Modulus"
                    style={{ flex: '1', minWidth: '80px' }}
                  />
                </div>
              </InputGroup>
              <Button onClick={calculateModularPower}>Calculate</Button>
              
              {modularResult && (
                <ResultBox>
                  <div>{modularResult.calculation}</div>
                  <div>Result: {modularResult.result}</div>
                </ResultBox>
              )}
            </InteractiveExample>
          </Card>

          <Card>
            <CardTitle>🔢 Euler's Totient Function</CardTitle>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              φ(n) counts the positive integers up to n that are relatively prime to n.
            </p>
            
            <InteractiveExample>
              <InputGroup>
                <Label>Enter a number:</Label>
                <Input
                  type="number"
                  value={totientNumber}
                  onChange={(e) => setTotientNumber(e.target.value)}
                  placeholder="Enter number"
                />
              </InputGroup>
              <Button onClick={handleTotientCalculation}>Calculate φ(n)</Button>
              
              {totientResult && (
                <ResultBox>
                  <div>φ({totientResult.number}) = {totientResult.totient}</div>
                  <div>This means there are {totientResult.totient} numbers less than {totientResult.number} that are coprime to {totientResult.number}</div>
                </ResultBox>
              )}
            </InteractiveExample>
          </Card>
        </GridContainer>
      </Section>

      <Section>
        <SectionTitle>🏛️ Historical Context</SectionTitle>
        
        <GridContainer>
          <Card>
            <CardTitle>Ancient Origins</CardTitle>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p><strong>Euclid (300 BCE):</strong> Developed the Euclidean algorithm for finding GCD.</p>
              <p><strong>Chinese Remainder Theorem:</strong> Ancient Chinese mathematicians solved systems of modular equations.</p>
              <p><strong>Fermat's Little Theorem:</strong> Pierre de Fermat's work on modular arithmetic in the 17th century.</p>
            </div>
          </Card>

          <Card>
            <CardTitle>Modern Cryptography</CardTitle>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p><strong>RSA (1977):</strong> Rivest, Shamir, and Adleman created the first practical public-key cryptosystem.</p>
              <p><strong>Diffie-Hellman (1976):</strong> First public-key exchange protocol.</p>
              <p><strong>Elliptic Curve Cryptography:</strong> More efficient alternative to RSA using elliptic curves.</p>
            </div>
          </Card>

          <Card>
            <CardTitle>Mathematical Foundations</CardTitle>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p><strong>Prime Numbers:</strong> Fundamental building blocks of cryptography.</p>
              <p><strong>Modular Arithmetic:</strong> Enables efficient computation with large numbers.</p>
              <p><strong>Number Theory:</strong> Provides the mathematical framework for secure communication.</p>
            </div>
          </Card>
        </GridContainer>
      </Section>

      <Section>
        <SectionTitle>🔍 Interactive Examples</SectionTitle>
        
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.2)', 
            padding: '1.5rem', 
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ color: '#e0e7ff', marginBottom: '1rem' }}>Try These Examples:</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <strong>GCD Examples:</strong>
                <ul style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>
                  <li>gcd(48, 18) = 6</li>
                  <li>gcd(17, 13) = 1 (coprime)</li>
                  <li>gcd(100, 25) = 25</li>
                </ul>
              </div>
              
              <div>
                <strong>Modular Arithmetic:</strong>
                <ul style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>
                  <li>2^10 mod 7 = 2</li>
                  <li>3^4 mod 5 = 1</li>
                  <li>7^3 mod 11 = 2</li>
                </ul>
              </div>
              
              <div>
                <strong>Euler's Totient:</strong>
                <ul style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>
                  <li>φ(7) = 6 (primes)</li>
                  <li>φ(8) = 4</li>
                  <li>φ(15) = 8</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle>🎯 Applications in Cryptography</SectionTitle>
        
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Card>
              <CardTitle>🔐 RSA Encryption</CardTitle>
              <p style={{ fontSize: '0.9rem' }}>
                Uses Euler's totient function φ(n) to generate public and private keys. 
                Security relies on the difficulty of factoring large composite numbers.
              </p>
            </Card>

            <Card>
              <CardTitle>🔑 Key Exchange</CardTitle>
              <p style={{ fontSize: '0.9rem' }}>
                Diffie-Hellman protocol uses modular exponentiation to securely exchange 
                cryptographic keys over public channels.
              </p>
            </Card>

            <Card>
              <CardTitle>📊 Hash Functions</CardTitle>
              <p style={{ fontSize: '0.9rem' }}>
                Many hash functions use modular arithmetic operations to ensure 
                uniform distribution of hash values.
              </p>
            </Card>

            <Card>
              <CardTitle>🎲 Random Number Generation</CardTitle>
              <p style={{ fontSize: '0.9rem' }}>
                Linear congruential generators use modular arithmetic to produce 
                pseudo-random sequences for cryptographic purposes.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </HistoryContainer>
  );
};

export default HistoryInfo;
