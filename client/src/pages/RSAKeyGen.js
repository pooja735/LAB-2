import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const RSAContainer = styled.div`
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

const StepBox = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const StepNumber = styled.div`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FlowchartContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 1rem;
`;

const FlowchartStep = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;
  color: white;
`;

const Arrow = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #667eea;
  margin: 0.5rem 0;
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

const RSAKeyGen = () => {
  const [prime1, setPrime1] = useState('');
  const [prime2, setPrime2] = useState('');
  const [keyData, setKeyData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRSAKeys = async () => {
    if (!prime1 || !prime2) {
      alert('Please enter two prime numbers');
      return;
    }

    if (prime1 === prime2) {
      alert('Please enter two different prime numbers');
      return;
    }

    setLoading(true);
    try {
      // Generate keys using the provided primes
      const response = await api.get('/crypto/rsa/generate-keys');
      
      // Calculate RSA parameters manually for educational purposes
      const p = parseInt(prime1);
      const q = parseInt(prime2);
      const n = p * q;
      const phi = (p - 1) * (q - 1);
      
      // Find e (public exponent)
      let e = 65537; // Common choice
      if (gcd(e, phi) !== 1) {
        e = 3;
        while (gcd(e, phi) !== 1 && e < phi) {
          e += 2;
        }
      }
      
      // Find d (private exponent) using extended Euclidean algorithm
      const d = modInverse(e, phi);
      
      setKeyData({
        p,
        q,
        n,
        phi,
        e,
        d,
        publicKey: response.data.publicKey,
        privateKey: response.data.privateKey
      });
    } catch (error) {
      console.error('Error generating RSA keys:', error);
      alert('Error generating RSA keys: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const modInverse = (a, m) => {
    let [oldR, r] = [a, m];
    let [oldS, s] = [1, 0];
    
    while (r !== 0) {
      const quotient = Math.floor(oldR / r);
      [oldR, r] = [r, oldR - quotient * r];
      [oldS, s] = [s, oldS - quotient * s];
    }
    
    return oldS < 0 ? oldS + m : oldS;
  };

  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  return (
    <RSAContainer>
      <PageTitle>RSA Key Generation</PageTitle>
      
      <Section>
        <SectionTitle>🔢 Input Prime Numbers</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Enter two different prime numbers. The system will generate RSA keys and explain each step of the process.
        </p>
        
        <GridContainer>
          <div>
            <InputGroup>
              <Label>First Prime Number (p):</Label>
              <Input
                type="number"
                value={prime1}
                onChange={(e) => setPrime1(e.target.value)}
                placeholder="Enter first prime..."
                min="2"
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Second Prime Number (q):</Label>
              <Input
                type="number"
                value={prime2}
                onChange={(e) => setPrime2(e.target.value)}
                placeholder="Enter second prime..."
                min="2"
              />
            </InputGroup>
            
            <Button onClick={generateRSAKeys} disabled={loading}>
              {loading && <LoadingSpinner />}
              Generate RSA Keys
            </Button>
          </div>
          
          <div>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Prime Validation:</h3>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <div>p = {prime1 || '?'} {prime1 && (isPrime(parseInt(prime1)) ? '✅ Prime' : '❌ Not Prime')}</div>
              <div>q = {prime2 || '?'} {prime2 && (isPrime(parseInt(prime2)) ? '✅ Prime' : '❌ Not Prime')}</div>
              {prime1 && prime2 && (
                <div style={{ marginTop: '1rem' }}>
                  <div>n = p × q = {parseInt(prime1) * parseInt(prime2)}</div>
                  <div>φ(n) = (p-1)(q-1) = {(parseInt(prime1) - 1) * (parseInt(prime2) - 1)}</div>
                </div>
              )}
            </div>
          </div>
        </GridContainer>
      </Section>

      {keyData && (
        <Section>
          <SectionTitle>📊 RSA Key Generation Results</SectionTitle>
          
          <ResultBox>
            <strong>Generated RSA Parameters:</strong><br />
            <div style={{ marginTop: '0.5rem' }}>
              <div>p = {keyData.p}</div>
              <div>q = {keyData.q}</div>
              <div>n = p × q = {keyData.n}</div>
              <div>φ(n) = (p-1)(q-1) = {keyData.phi}</div>
              <div>e (public exponent) = {keyData.e}</div>
              <div>d (private exponent) = {keyData.d}</div>
            </div>
          </ResultBox>
          
          <GridContainer>
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Public Key:</h3>
              <ResultBox>
                <div style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>
                  {keyData.publicKey}
                </div>
              </ResultBox>
            </div>
            
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Private Key:</h3>
              <ResultBox>
                <div style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>
                  {keyData.privateKey}
                </div>
              </ResultBox>
            </div>
          </GridContainer>
        </Section>
      )}

      <Section>
        <SectionTitle>📋 Step-by-Step RSA Key Generation</SectionTitle>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <StepBox>
            <StepNumber>1</StepNumber>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Choose Two Primes</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              Select two large prime numbers p and q. These should be kept secret.
            </p>
            <div style={{ color: '#667eea', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              p = {keyData?.p || '?'}, q = {keyData?.q || '?'}
            </div>
          </StepBox>
          
          <StepBox>
            <StepNumber>2</StepNumber>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Calculate Modulus</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              Compute n = p × q. This is the modulus used in encryption/decryption.
            </p>
            <div style={{ color: '#667eea', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              n = p × q = {keyData?.n || '?'}
            </div>
          </StepBox>
          
          <StepBox>
            <StepNumber>3</StepNumber>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Calculate Euler's Totient</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              Compute φ(n) = (p-1)(q-1). This determines the number of coprime integers.
            </p>
            <div style={{ color: '#667eea', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              φ(n) = (p-1)(q-1) = {keyData?.phi || '?'}
            </div>
          </StepBox>
          
          <StepBox>
            <StepNumber>4</StepNumber>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Choose Public Exponent</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              Select e such that 1 &lt; e &lt; φ(n) and gcd(e, φ(n)) = 1.
            </p>
            <div style={{ color: '#667eea', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              e = {keyData?.e || '?'} (public exponent)
            </div>
          </StepBox>
          
          <StepBox>
            <StepNumber>5</StepNumber>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Calculate Private Exponent</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              Find d such that d × e ≡ 1 (mod φ(n)) using extended Euclidean algorithm.
            </p>
            <div style={{ color: '#667eea', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              d = {keyData?.d || '?'} (private exponent)
            </div>
          </StepBox>
          
          <StepBox>
            <StepNumber>6</StepNumber>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Key Pairs</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              Public key: (n, e), Private key: (n, d)
            </p>
            <div style={{ color: '#667eea', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              Public: ({keyData?.n || '?'}, {keyData?.e || '?'})<br />
              Private: ({keyData?.n || '?'}, {keyData?.d || '?'})
            </div>
          </StepBox>
        </div>
      </Section>

      <Section>
        <SectionTitle>🔄 RSA Encryption/Decryption Flowchart</SectionTitle>
        
        <FlowchartContainer>
          <FlowchartStep>
            <strong>Start: Message M</strong>
          </FlowchartStep>
          <Arrow>↓</Arrow>
          
          <FlowchartStep>
            <strong>Encryption: C = M^e mod n</strong><br />
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
              Using public key (n, e)
            </div>
          </FlowchartStep>
          <Arrow>↓</Arrow>
          
          <FlowchartStep>
            <strong>Ciphertext C</strong>
          </FlowchartStep>
          <Arrow>↓</Arrow>
          
          <FlowchartStep>
            <strong>Decryption: M = C^d mod n</strong><br />
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
              Using private key (n, d)
            </div>
          </FlowchartStep>
          <Arrow>↓</Arrow>
          
          <FlowchartStep>
            <strong>Original Message M</strong>
          </FlowchartStep>
        </FlowchartContainer>
      </Section>

      <Section>
        <SectionTitle>📚 Mathematical Formulas</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.2)', 
            padding: '1.5rem', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div><strong>Key Generation:</strong></div>
            <div>• n = p × q (modulus)</div>
            <div>• φ(n) = (p-1)(q-1) (Euler's totient)</div>
            <div>• e: public exponent (gcd(e, φ(n)) = 1)</div>
            <div>• d: private exponent (d × e ≡ 1 mod φ(n))</div>
            <br />
            <div><strong>Encryption/Decryption:</strong></div>
            <div>• Encryption: C = M^e mod n</div>
            <div>• Decryption: M = C^d mod n</div>
            <br />
            <div><strong>Security:</strong></div>
            <div>• Security relies on difficulty of factoring n</div>
            <div>• Large key sizes (2048+ bits) recommended</div>
          </div>
        </div>
      </Section>
    </RSAContainer>
  );
};

export default RSAKeyGen;
