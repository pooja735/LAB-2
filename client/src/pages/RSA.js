import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../utils/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 100px;
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

const KeyDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const KeyBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
`;

const KeyTitle = styled.h4`
  color: #e0e7ff;
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

const RSA = () => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');

  const generateKeys = async () => {
    setLoading(true);
    try {
      const response = await api.get('/crypto/rsa/generate-keys');
      setPublicKey(response.data.publicKey);
      setPrivateKey(response.data.privateKey);
    } catch (error) {
      console.error('Error generating keys:', error);
      alert('Error generating keys: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const encryptMessage = async () => {
    if (!message) {
      alert('Please enter a message to encrypt');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/crypto/rsa/encrypt', {
        message,
        publicKey: publicKey || undefined
      });
      setEncryptedMessage(response.data.encrypted);
      // Update keys if they were generated during encryption
      if (response.data.publicKey) {
        setPublicKey(response.data.publicKey);
      }
      if (response.data.privateKey) {
        setPrivateKey(response.data.privateKey);
      }
    } catch (error) {
      console.error('Error encrypting message:', error);
      alert('Error encrypting message: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const decryptMessage = async () => {
    if (!encryptedMessage || !privateKey) {
      alert('Please enter an encrypted message and private key');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/crypto/rsa/decrypt', {
        encryptedMessage,
        privateKey
      });
      setDecryptedMessage(response.data.decrypted);
    } catch (error) {
      console.error('Error decrypting message:', error);
      alert('Error decrypting message: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  const handleCopy = (text, type) => {
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <RSAContainer>
      <PageTitle>RSA Encryption & Decryption</PageTitle>
      
      <Section>
        <SectionTitle>🔑 Generate RSA Key Pair</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Generate a public-private key pair for RSA encryption. The public key is used for encryption, 
          while the private key is used for decryption.
        </p>
        <Button onClick={generateKeys} disabled={loading}>
          {loading && <LoadingSpinner />}
          Generate Key Pair
        </Button>
        
        {publicKey && privateKey && (
          <KeyDisplay>
            <KeyBox>
              <KeyTitle>Public Key (for encryption)</KeyTitle>
              <SyntaxHighlighter language="text" style={tomorrow}>
                {publicKey}
              </SyntaxHighlighter>
              <CopyToClipboard text={publicKey} onCopy={() => handleCopy(publicKey, 'public')}>
                <CopyButton>
                  {copied === 'public' ? '✓ Copied!' : 'Copy Public Key'}
                </CopyButton>
              </CopyToClipboard>
            </KeyBox>
            
            <KeyBox>
              <KeyTitle>Private Key (for decryption)</KeyTitle>
              <SyntaxHighlighter language="text" style={tomorrow}>
                {privateKey}
              </SyntaxHighlighter>
              <CopyToClipboard text={privateKey} onCopy={() => handleCopy(privateKey, 'private')}>
                <CopyButton>
                  {copied === 'private' ? '✓ Copied!' : 'Copy Private Key'}
                </CopyButton>
              </CopyToClipboard>
            </KeyBox>
          </KeyDisplay>
        )}
      </Section>

      <Section>
        <SectionTitle>🔒 Encrypt Message</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Enter a message to encrypt using the public key. The encrypted result will be in Base64 format.
        </p>
        
        <InputGroup>
          <Label>Message to Encrypt:</Label>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
          />
        </InputGroup>
        
        <Button onClick={encryptMessage} disabled={loading || !publicKey}>
          {loading && <LoadingSpinner />}
          Encrypt Message
        </Button>
        
        {encryptedMessage && (
          <ResultBox>
            <strong>Encrypted Message:</strong><br />
            {encryptedMessage}
            <CopyToClipboard text={encryptedMessage} onCopy={() => handleCopy(encryptedMessage, 'encrypted')}>
              <CopyButton>
                {copied === 'encrypted' ? '✓ Copied!' : 'Copy Encrypted Message'}
              </CopyButton>
            </CopyToClipboard>
          </ResultBox>
        )}
      </Section>

      <Section>
        <SectionTitle>🔓 Decrypt Message</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Enter an encrypted message and the corresponding private key to decrypt it.
        </p>
        
        <InputGroup>
          <Label>Encrypted Message:</Label>
          <TextArea
            value={encryptedMessage}
            onChange={(e) => setEncryptedMessage(e.target.value)}
            placeholder="Enter encrypted message here..."
          />
        </InputGroup>
        
        <Button onClick={decryptMessage} disabled={loading || !privateKey}>
          {loading && <LoadingSpinner />}
          Decrypt Message
        </Button>
        
        {decryptedMessage && (
          <ResultBox>
            <strong>Decrypted Message:</strong><br />
            {decryptedMessage}
            <CopyToClipboard text={decryptedMessage} onCopy={() => handleCopy(decryptedMessage, 'decrypted')}>
              <CopyButton>
                {copied === 'decrypted' ? '✓ Copied!' : 'Copy Decrypted Message'}
              </CopyButton>
            </CopyToClipboard>
          </ResultBox>
        )}
      </Section>

      <Section>
        <SectionTitle>📚 RSA Algorithm Information</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <p><strong>RSA (Rivest-Shamir-Adleman)</strong> is a public-key cryptosystem that is widely used for secure data transmission.</p>
          <br />
          <p><strong>Key Generation Process:</strong></p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Choose two distinct prime numbers p and q</li>
            <li>Calculate n = p × q (modulus)</li>
            <li>Calculate φ(n) = (p-1)(q-1) (Euler's totient function)</li>
            <li>Choose e such that 1 &lt; e &lt; φ(n) and gcd(e, φ(n)) = 1</li>
            <li>Calculate d such that d × e ≡ 1 (mod φ(n))</li>
          </ul>
          <br />
          <p><strong>Encryption:</strong> c = m^e mod n</p>
          <p><strong>Decryption:</strong> m = c^d mod n</p>
        </div>
      </Section>
    </RSAContainer>
  );
};

export default RSA;
