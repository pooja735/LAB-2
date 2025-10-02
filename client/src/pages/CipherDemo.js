import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const CipherContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: #0d1117;
  min-height: 100vh;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
`;

const PageTitle = styled.h1`
  color: #f0f6fc;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #58a6ff 0%, #f85149 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Section = styled.section`
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h2`
  color: #f0f6fc;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, #58a6ff, #f85149);
    border-radius: 2px;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #f0f6fc;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #30363d;
  border-radius: 8px;
  background: #0d1117;
  color: #f0f6fc;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #58a6ff;
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
    background: #161b22;
  }
  
  &::placeholder {
    color: #7d8590;
  }
  
  &:hover {
    border-color: #58a6ff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #30363d;
  border-radius: 8px;
  background: #0d1117;
  color: #f0f6fc;
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #58a6ff;
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
    background: #161b22;
  }
  
  &::placeholder {
    color: #7d8590;
  }
  
  &:hover {
    border-color: #58a6ff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #30363d;
  border-radius: 8px;
  background: #0d1117;
  color: #f0f6fc;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #58a6ff;
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
    background: #161b22;
  }
  
  &:hover {
    border-color: #58a6ff;
  }
  
  option {
    background: #0d1117;
    color: #f0f6fc;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #238636 0%, #2ea043 100%);
  color: #f0f6fc;
  border: 1px solid #238636;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: inherit;
  
  &:hover {
    background: linear-gradient(135deg, #2ea043 0%, #238636 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(35, 134, 54, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  &.secondary {
    background: linear-gradient(135deg, #da3633 0%, #f85149 100%);
    border-color: #da3633;
    
    &:hover {
      background: linear-gradient(135deg, #f85149 0%, #da3633 100%);
      box-shadow: 0 4px 12px rgba(248, 81, 73, 0.3);
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(240, 246, 252, 0.3);
  border-top: 2px solid #f0f6fc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ResultBox = styled.div`
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  color: #f0f6fc;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #58a6ff, #f85149);
    border-radius: 8px 8px 0 0;
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

const ChartContainer = styled.div`
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;

const FrequencyBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  
  span {
    min-width: 20px;
    margin-right: 0.5rem;
    font-weight: bold;
    color: #f0f6fc;
  }
  
  .bar {
    height: 20px;
    background: linear-gradient(90deg, #58a6ff, #f85149);
    border-radius: 4px;
    margin-right: 0.5rem;
    min-width: 2px;
  }
  
  .count {
    font-size: 0.9rem;
    color: #7d8590;
  }
`;

const CodeBlock = styled.div`
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-size: 0.9rem;
  color: #f0f6fc;
  overflow-x: auto;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.success {
    background: rgba(35, 134, 54, 0.2);
    color: #3fb950;
    border: 1px solid rgba(35, 134, 54, 0.3);
  }
  
  &.error {
    background: rgba(248, 81, 73, 0.2);
    color: #f85149;
    border: 1px solid rgba(248, 81, 73, 0.3);
  }
  
  &.info {
    background: rgba(88, 166, 255, 0.2);
    color: #58a6ff;
    border: 1px solid rgba(88, 166, 255, 0.3);
  }
`;

const CipherDemo = () => {
  const [cipherType, setCipherType] = useState('caesar');
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [decryptedText, setDecryptedText] = useState('');
  
  // Separate decryption inputs
  const [encryptedInput, setEncryptedInput] = useState('');
  const [decryptKey, setDecryptKey] = useState('');
  const [decryptResult, setDecryptResult] = useState(null);

  // Caesar Cipher
  const caesarEncrypt = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toLowerCase().charCodeAt(0);
        const shiftedCode = ((charCode - 97 + parseInt(shift)) % 26 + 26) % 26 + 97;
        return isUpperCase ? String.fromCharCode(shiftedCode).toUpperCase() : String.fromCharCode(shiftedCode);
      }
      return char;
    }).join('');
  };

  const caesarDecrypt = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toLowerCase().charCodeAt(0);
        const shiftedCode = ((charCode - 97 - parseInt(shift)) % 26 + 26) % 26 + 97;
        return isUpperCase ? String.fromCharCode(shiftedCode).toUpperCase() : String.fromCharCode(shiftedCode);
      }
      return char;
    }).join('');
  };

  // Affine Cipher
  const affineEncrypt = (text, a, b) => {
    return text.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toLowerCase().charCodeAt(0) - 97;
        const encryptedCode = (parseInt(a) * charCode + parseInt(b)) % 26;
        const encryptedChar = String.fromCharCode(encryptedCode + 97);
        return isUpperCase ? encryptedChar.toUpperCase() : encryptedChar;
      }
      return char;
    }).join('');
  };

  const affineDecrypt = (text, a, b) => {
    // Find modular inverse of a mod 26
    const modInverse = (a, m) => {
      for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
          return x;
        }
      }
      return 1;
    };

    const aInv = modInverse(parseInt(a), 26);
    
    return text.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toLowerCase().charCodeAt(0) - 97;
        const decryptedCode = (aInv * (charCode - parseInt(b) + 26)) % 26;
        const decryptedChar = String.fromCharCode(decryptedCode + 97);
        return isUpperCase ? decryptedChar.toUpperCase() : decryptedChar;
      }
      return char;
    }).join('');
  };

  // RSA Encryption (using API)
  const rsaEncrypt = async (text) => {
    try {
      const response = await api.post('/crypto/rsa/encrypt', {
        message: text
      });
      return response.data.encrypted;
    } catch (error) {
      throw new Error('RSA encryption failed: ' + (error.response?.data?.error || error.message));
    }
  };

  const rsaDecrypt = async (encryptedText, privateKey) => {
    try {
      const response = await api.post('/crypto/rsa/decrypt', {
        encryptedMessage: encryptedText,
        privateKey: privateKey
      });
      return response.data.decrypted;
    } catch (error) {
      throw new Error('RSA decryption failed: ' + (error.response?.data?.error || error.message));
    }
  };

  const encryptText = async () => {
    if (!plaintext.trim()) {
      alert('Please enter text to encrypt');
      return;
    }

    setLoading(true);
    try {
      let encrypted;
      let privateKey = null;
      
      switch (cipherType) {
        case 'caesar':
          if (!key || isNaN(key)) {
            alert('Please enter a valid shift key (number)');
            setLoading(false);
            return;
          }
          encrypted = caesarEncrypt(plaintext, key);
          break;
          
        case 'affine':
          const [a, b] = key.split(',').map(k => k.trim());
          if (!a || !b || isNaN(a) || isNaN(b)) {
            alert('Please enter valid keys in format: a,b (e.g., 3,7)');
            setLoading(false);
            return;
          }
          encrypted = affineEncrypt(plaintext, a, b);
          break;
          
        case 'rsa':
          const rsaResponse = await api.post('/crypto/rsa/encrypt', {
            message: plaintext
          });
          encrypted = rsaResponse.data.encrypted;
          privateKey = rsaResponse.data.privateKey;
          break;
          
        default:
          throw new Error('Unknown cipher type');
      }
      
      setResult({
        cipher: cipherType,
        plaintext,
        encrypted,
        key: cipherType === 'rsa' ? 'Generated automatically' : key,
        privateKey: privateKey
      });
    } catch (error) {
      alert('Encryption failed: ' + error.message);
    }
    setLoading(false);
  };

  const decryptText = async () => {
    if (!result || !result.encrypted) {
      alert('Please encrypt some text first');
      return;
    }

    setLoading(true);
    try {
      let decrypted;
      
      switch (result.cipher) {
        case 'caesar':
          if (!key || isNaN(key)) {
            alert('Please enter a valid shift key (number)');
            setLoading(false);
            return;
          }
          decrypted = caesarDecrypt(result.encrypted, key);
          break;
          
        case 'affine':
          const [a, b] = key.split(',').map(k => k.trim());
          if (!a || !b || isNaN(a) || isNaN(b)) {
            alert('Please enter valid keys in format: a,b (e.g., 3,7)');
            setLoading(false);
            return;
          }
          decrypted = affineDecrypt(result.encrypted, a, b);
          break;
          
        case 'rsa':
          if (!result.privateKey) {
            alert('RSA private key not available for decryption');
            setLoading(false);
            return;
          }
          decrypted = await rsaDecrypt(result.encrypted, result.privateKey);
          break;
          
        default:
          throw new Error('Unknown cipher type');
      }
      
      setDecryptedText(decrypted);
    } catch (error) {
      alert('Decryption failed: ' + error.message);
    }
    setLoading(false);
  };

  const decryptUserInput = async () => {
    if (!encryptedInput.trim()) {
      alert('Please enter encrypted text to decrypt');
      return;
    }

    if (!decryptKey.trim()) {
      alert('Please enter the decryption key');
      return;
    }

    setLoading(true);
    try {
      let decrypted;
      
      switch (cipherType) {
        case 'caesar':
          if (isNaN(decryptKey)) {
            alert('Please enter a valid shift key (number)');
            setLoading(false);
            return;
          }
          decrypted = caesarDecrypt(encryptedInput, decryptKey);
          break;
          
        case 'affine':
          const [a, b] = decryptKey.split(',').map(k => k.trim());
          if (!a || !b || isNaN(a) || isNaN(b)) {
            alert('Please enter valid keys in format: a,b (e.g., 3,7)');
            setLoading(false);
            return;
          }
          decrypted = affineDecrypt(encryptedInput, a, b);
          break;
          
        case 'rsa':
          decrypted = await rsaDecrypt(encryptedInput, decryptKey);
          break;
          
        default:
          throw new Error('Unknown cipher type');
      }
      
      setDecryptResult({
        cipher: cipherType,
        encrypted: encryptedInput,
        decrypted,
        key: decryptKey
      });
    } catch (error) {
      alert('Decryption failed: ' + error.message);
    }
    setLoading(false);
  };

  const calculateFrequency = (text) => {
    const frequency = {};
    const cleanText = text.toLowerCase().replace(/[^a-z]/g, '');
    
    for (let char of cleanText) {
      frequency[char] = (frequency[char] || 0) + 1;
    }
    
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  };

  const renderFrequencyChart = (frequencies, title) => {
    const maxFreq = Math.max(...frequencies.map(([, freq]) => freq));
    
    return (
      <ChartContainer>
        <h4 style={{ color: '#f0f6fc', marginBottom: '1rem' }}>{title}</h4>
        {frequencies.map(([char, freq]) => (
          <FrequencyBar key={char}>
            <span>{char.toUpperCase()}</span>
            <div 
              className="bar" 
              style={{ width: `${(freq / maxFreq) * 200}px` }}
            />
            <span className="count">{freq}</span>
          </FrequencyBar>
        ))}
      </ChartContainer>
    );
  };

  return (
    <CipherContainer>
      <PageTitle>🔐 Cipher Demonstration</PageTitle>
      
      <Section>
        <SectionTitle>⚙️ Encryption Engine</SectionTitle>
        <p style={{ color: '#7d8590', marginBottom: '1.5rem' }}>
          Select a cipher type and encrypt your text with professional-grade cryptographic algorithms.
        </p>
        
        <GridContainer>
          <div>
            <InputGroup>
              <Label>Cipher Type</Label>
              <Select value={cipherType} onChange={(e) => setCipherType(e.target.value)}>
                <option value="caesar">Caesar Cipher</option>
                <option value="affine">Affine Cipher</option>
                <option value="rsa">RSA Encryption</option>
              </Select>
            </InputGroup>
            
            <InputGroup>
              <Label>Plaintext</Label>
              <TextArea
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Enter text to encrypt..."
              />
            </InputGroup>
            
            <InputGroup>
              <Label>
                Encryption Key: 
                {cipherType === 'caesar' && ' (Shift amount, e.g., 3)'}
                {cipherType === 'affine' && ' (Format: a,b e.g., 3,7)'}
                {cipherType === 'rsa' && ' (Generated automatically)'}
              </Label>
              <Input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder={
                  cipherType === 'caesar' ? 'Enter shift (e.g., 3)' :
                  cipherType === 'affine' ? 'Enter a,b (e.g., 3,7)' :
                  'Key will be generated automatically'
                }
                disabled={cipherType === 'rsa'}
              />
            </InputGroup>
            
            <Button onClick={encryptText} disabled={loading}>
              {loading && <LoadingSpinner />}
              Encrypt Text
            </Button>
            
            {result && result.encrypted && (
              <Button onClick={decryptText} disabled={loading}>
                {loading && <LoadingSpinner />}
                Decrypt Text
              </Button>
            )}
            
            <Button 
              onClick={() => {
                setPlaintext('');
                setKey('');
                setResult(null);
                setDecryptedText('');
                setEncryptedInput('');
                setDecryptKey('');
                setDecryptResult(null);
              }}
              className="secondary"
            >
              Clear All
            </Button>
          </div>
          
          <div>
            <h3 style={{ color: '#f0f6fc', marginBottom: '1rem' }}>Algorithm Information</h3>
            <CodeBlock>
              {cipherType === 'caesar' && (
                <div>
                  <div style={{ color: '#58a6ff' }}>// Caesar Cipher</div>
                  <div>E(x) = (x + k) mod 26</div>
                  <div>D(x) = (x - k) mod 26</div>
                  <br />
                  <div style={{ color: '#7d8590' }}>// Simple substitution cipher</div>
                  <div style={{ color: '#7d8590' }}>// Shift each letter by k positions</div>
                </div>
              )}
              {cipherType === 'affine' && (
                <div>
                  <div style={{ color: '#58a6ff' }}>// Affine Cipher</div>
                  <div>E(x) = (ax + b) mod 26</div>
                  <div>D(x) = a^(-1)(x - b) mod 26</div>
                  <br />
                  <div style={{ color: '#7d8590' }}>// Linear transformation cipher</div>
                  <div style={{ color: '#7d8590' }}>// Requires gcd(a,26) = 1</div>
                </div>
              )}
              {cipherType === 'rsa' && (
                <div>
                  <div style={{ color: '#58a6ff' }}>// RSA Encryption</div>
                  <div>c = m^e mod n</div>
                  <div>m = c^d mod n</div>
                  <br />
                  <div style={{ color: '#7d8590' }}>// Public key: (n, e)</div>
                  <div style={{ color: '#7d8590' }}>// Private key: (n, d)</div>
                </div>
              )}
            </CodeBlock>
          </div>
        </GridContainer>
      </Section>

      <Section>
        <SectionTitle>🔓 Decryption Engine</SectionTitle>
        <p style={{ color: '#7d8590', marginBottom: '1.5rem' }}>
          Enter encrypted text and the corresponding key to decrypt it back to plaintext.
        </p>
        
        <GridContainer>
          <div>
            <InputGroup>
              <Label>Encrypted Text</Label>
              <TextArea
                value={encryptedInput}
                onChange={(e) => setEncryptedInput(e.target.value)}
                placeholder="Enter encrypted text to decrypt..."
              />
            </InputGroup>
            
            <InputGroup>
              <Label>
                Decryption Key: 
                {cipherType === 'caesar' && ' (Shift amount, e.g., 3)'}
                {cipherType === 'affine' && ' (Format: a,b e.g., 3,7)'}
                {cipherType === 'rsa' && ' (Private key)'}
              </Label>
              <Input
                type="text"
                value={decryptKey}
                onChange={(e) => setDecryptKey(e.target.value)}
                placeholder={
                  cipherType === 'caesar' ? 'Enter shift (e.g., 3)' :
                  cipherType === 'affine' ? 'Enter a,b (e.g., 3,7)' :
                  'Enter RSA private key'
                }
              />
            </InputGroup>
            
            <Button onClick={decryptUserInput} disabled={loading}>
              {loading && <LoadingSpinner />}
              Decrypt Text
            </Button>
            
            <Button 
              onClick={() => {
                setEncryptedInput('');
                setDecryptKey('');
                setDecryptResult(null);
              }}
              className="secondary"
            >
              Clear Decryption
            </Button>
          </div>
          
          <div>
            <h3 style={{ color: '#f0f6fc', marginBottom: '1rem' }}>Decryption Instructions</h3>
            <div style={{ color: '#7d8590', lineHeight: '1.6' }}>
              {cipherType === 'caesar' && (
                <div>
                  <StatusBadge className="info">Caesar Cipher</StatusBadge>
                  <div style={{ marginTop: '0.5rem' }}>
                    • Use the same shift value used for encryption<br />
                    • Example: If encrypted with shift=3, decrypt with shift=3<br />
                    • Only works with the original encryption key
                  </div>
                </div>
              )}
              {cipherType === 'affine' && (
                <div>
                  <StatusBadge className="info">Affine Cipher</StatusBadge>
                  <div style={{ marginTop: '0.5rem' }}>
                    • Use the same a,b values used for encryption<br />
                    • Example: If encrypted with 3,7, decrypt with 3,7<br />
                    • Requires gcd(a,26) = 1 for valid decryption
                  </div>
                </div>
              )}
              {cipherType === 'rsa' && (
                <div>
                  <StatusBadge className="info">RSA Cipher</StatusBadge>
                  <div style={{ marginTop: '0.5rem' }}>
                    • Use the private key corresponding to the public key used for encryption<br />
                    • Private key is generated during encryption<br />
                    • Copy the private key from encryption results
                  </div>
                </div>
              )}
            </div>
          </div>
        </GridContainer>
        
        {decryptResult && (
          <ResultBox>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <StatusBadge className="success">Decryption Complete</StatusBadge>
            </div>
            <div><strong>Cipher:</strong> {decryptResult.cipher.toUpperCase()}</div>
            <div><strong>Encrypted Text:</strong> {decryptResult.encrypted}</div>
            <div><strong>Decrypted Text:</strong> {decryptResult.decrypted}</div>
            <div><strong>Key Used:</strong> {decryptResult.key}</div>
          </ResultBox>
        )}
        
        <div style={{ 
          background: '#0d1117', 
          border: '1px solid #30363d',
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem',
          color: '#7d8590',
          fontSize: '0.9rem'
        }}>
          <strong style={{ color: '#f0f6fc' }}>💡 Example Usage:</strong><br />
          <div style={{ marginTop: '0.5rem' }}>
            1. First, encrypt some text using the encryption section above<br />
            2. Copy the encrypted text and key from the results<br />
            3. Paste them into the decryption section below<br />
            4. Click "Decrypt Text" to get the original plaintext
          </div>
        </div>
      </Section>

      {result && (
        <Section>
          <SectionTitle>📊 Encryption Results & Analysis</SectionTitle>
          
          <ResultBox>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <StatusBadge className="success">Encryption Complete</StatusBadge>
            </div>
            <div><strong>Cipher:</strong> {result.cipher.toUpperCase()}</div>
            <div><strong>Plaintext:</strong> {result.plaintext}</div>
            <div><strong>Encrypted:</strong> {result.encrypted}</div>
            <div><strong>Key:</strong> {result.key}</div>
            {result.privateKey && (
              <div><strong>Private Key:</strong> Available for decryption</div>
            )}
          </ResultBox>
          
          {decryptedText && (
            <ResultBox>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <StatusBadge className={decryptedText === result.plaintext ? 'success' : 'error'}>
                  {decryptedText === result.plaintext ? 'Verification Passed' : 'Verification Failed'}
                </StatusBadge>
              </div>
              <div><strong>Decrypted Text:</strong> {decryptedText}</div>
              <div><strong>Verification:</strong> {decryptedText === result.plaintext ? '✅ Match' : '❌ No Match'}</div>
            </ResultBox>
          )}
          
          <GridContainer>
            <div>
              <h3 style={{ color: '#f0f6fc', marginBottom: '1rem' }}>Letter Frequency Analysis</h3>
              <h4 style={{ color: '#7d8590', marginBottom: '0.5rem' }}>Before Encryption:</h4>
              {renderFrequencyChart(calculateFrequency(result.plaintext), 'Original Text')}
            </div>
            <div>
              <h4 style={{ color: '#7d8590', marginBottom: '0.5rem' }}>After Encryption:</h4>
              {renderFrequencyChart(calculateFrequency(result.encrypted), 'Encrypted Text')}
            </div>
          </GridContainer>
        </Section>
      )}
    </CipherContainer>
  );
};

export default CipherDemo;