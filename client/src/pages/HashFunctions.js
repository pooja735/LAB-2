import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const HashContainer = styled.div`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: 'Fira Code', monospace;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  option {
    background: #333;
    color: white;
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
  word-break: break-all;
`;

const CopyButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const HashComparison = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const HashResult = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
`;

const HashTitle = styled.h4`
  color: #e0e7ff;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const HashValue = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  word-break: break-all;
  margin-bottom: 0.5rem;
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

const HashFunctions = () => {
  const [message, setMessage] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('sha256');
  const [hashResult, setHashResult] = useState(null);
  const [allHashes, setAllHashes] = useState({});
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');

  const algorithms = [
    { value: 'sha256', label: 'SHA-256', description: '256-bit hash' },
    { value: 'sha512', label: 'SHA-512', description: '512-bit hash' },
    { value: 'md5', label: 'MD5', description: '128-bit hash (deprecated)' }
  ];

  const generateHash = async () => {
    if (!message.trim()) {
      alert('Please enter a message to hash');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/crypto/hash', {
        message,
        algorithm: selectedAlgorithm
      });
      setHashResult(response.data);
    } catch (error) {
      console.error('Error generating hash:', error);
      alert('Error generating hash: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const generateAllHashes = async () => {
    if (!message.trim()) {
      alert('Please enter a message to hash');
      return;
    }

    setLoading(true);
    const results = {};
    
    try {
      for (const algo of algorithms) {
        const response = await api.post('/crypto/hash', {
          message,
          algorithm: algo.value
        });
        results[algo.value] = response.data;
      }
      setAllHashes(results);
    } catch (error) {
      console.error('Error generating hashes:', error);
      alert('Error generating hashes: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const handleCopy = (text, type) => {
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const getHashLength = (algorithm) => {
    const lengths = {
      'sha256': 64,
      'sha512': 128,
      'md5': 32
    };
    return lengths[algorithm] || 0;
  };

  const getHashBits = (algorithm) => {
    const bits = {
      'sha256': 256,
      'sha512': 512,
      'md5': 128
    };
    return bits[algorithm] || 0;
  };

  return (
    <HashContainer>
      <PageTitle>Hash Functions</PageTitle>
      
      <Section>
        <SectionTitle>🔐 Hash Function Generator</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Generate cryptographic hash values using different algorithms. Hash functions are one-way functions 
          that produce a fixed-size output from variable-size input.
        </p>
        
        <InputGroup>
          <Label>Message to Hash:</Label>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Hash Algorithm:</Label>
          <Select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
          >
            {algorithms.map(algo => (
              <option key={algo.value} value={algo.value}>
                {algo.label} - {algo.description}
              </option>
            ))}
          </Select>
        </InputGroup>
        
        <Button onClick={generateHash} disabled={loading}>
          {loading && <LoadingSpinner />}
          Generate Hash
        </Button>
        
        <Button onClick={generateAllHashes} disabled={loading}>
          {loading && <LoadingSpinner />}
          Generate All Hashes
        </Button>
        
        {hashResult && (
          <ResultBox>
            <strong>Hash Result ({hashResult.algorithm.toUpperCase()}):</strong><br />
            <div style={{ marginTop: '0.5rem' }}>
              <div>Algorithm: {hashResult.algorithm.toUpperCase()}</div>
              <div>Input: {hashResult.input}</div>
              <div>Hash Length: {getHashLength(hashResult.algorithm)} characters ({getHashBits(hashResult.algorithm)} bits)</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                <strong>Hash Value:</strong><br />
                {hashResult.hash}
              </div>
            </div>
            <CopyToClipboard text={hashResult.hash} onCopy={() => handleCopy(hashResult.hash, 'single')}>
              <CopyButton>
                {copied === 'single' ? '✓ Copied!' : 'Copy Hash'}
              </CopyButton>
            </CopyToClipboard>
          </ResultBox>
        )}
        
        {Object.keys(allHashes).length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>All Hash Results:</h3>
            <HashComparison>
              {Object.entries(allHashes).map(([algorithm, result]) => (
                <HashResult key={algorithm}>
                  <HashTitle>{result.algorithm.toUpperCase()}</HashTitle>
                  <HashValue>{result.hash}</HashValue>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {getHashLength(algorithm)} chars, {getHashBits(algorithm)} bits
                  </div>
                  <CopyToClipboard text={result.hash} onCopy={() => handleCopy(result.hash, algorithm)}>
                    <CopyButton style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}>
                      {copied === algorithm ? '✓' : 'Copy'}
                    </CopyButton>
                  </CopyToClipboard>
                </HashResult>
              ))}
            </HashComparison>
          </div>
        )}
      </Section>

      <Section>
        <SectionTitle>📊 Hash Function Comparison</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {algorithms.map(algo => (
              <div key={algo.value} style={{ 
                background: 'rgba(0, 0, 0, 0.2)', 
                padding: '1rem', 
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h4 style={{ color: '#e0e7ff', marginBottom: '0.5rem' }}>{algo.label}</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{algo.description}</p>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <div>Output Size: {getHashBits(algo.value)} bits</div>
                  <div>Hex Length: {getHashLength(algo.value)} characters</div>
                  <div>Security: {algo.value === 'md5' ? 'Weak (deprecated)' : algo.value === 'sha256' ? 'Strong' : 'Very Strong'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle>🔍 Hash Function Properties</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <p><strong>Deterministic:</strong> The same input always produces the same hash output.</p>
          <br />
          <p><strong>One-way:</strong> It's computationally infeasible to reverse the hash to get the original input.</p>
          <br />
          <p><strong>Fixed Output Size:</strong> Hash functions always produce output of a fixed size regardless of input size.</p>
          <br />
          <p><strong>Avalanche Effect:</strong> Small changes in input produce large changes in output.</p>
          <br />
          <p><strong>Collision Resistance:</strong> It's computationally infeasible to find two different inputs that produce the same hash.</p>
          <br />
          <p><strong>Pre-image Resistance:</strong> Given a hash, it's computationally infeasible to find an input that produces that hash.</p>
          <br />
          <p><strong>Second Pre-image Resistance:</strong> Given an input and its hash, it's computationally infeasible to find another input that produces the same hash.</p>
        </div>
      </Section>

      <Section>
        <SectionTitle>⚠️ Security Considerations</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <div style={{ 
            background: 'rgba(255, 193, 7, 0.1)', 
            border: '1px solid rgba(255, 193, 7, 0.3)', 
            borderRadius: '8px', 
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <strong style={{ color: '#ffc107' }}>MD5 Warning:</strong> MD5 is cryptographically broken and should not be used for security purposes. It's included here for educational purposes only.
          </div>
          
          <p><strong>SHA-256:</strong> Currently considered secure and widely used in applications like Bitcoin and SSL/TLS certificates.</p>
          <br />
          <p><strong>SHA-512:</strong> More secure than SHA-256 but requires more computational resources. Often truncated to 256 bits.</p>
          <br />
          <p><strong>Best Practices:</strong></p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Use SHA-256 or SHA-512 for new applications</li>
            <li>Always use salt with passwords before hashing</li>
            <li>Consider using keyed hash functions (HMAC) for authentication</li>
            <li>Use appropriate iteration counts for password hashing (bcrypt, scrypt, Argon2)</li>
          </ul>
        </div>
      </Section>
    </HashContainer>
  );
};

export default HashFunctions;
