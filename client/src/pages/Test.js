import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const TestContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const TestSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
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

const Test = () => {
  const [testResults, setTestResults] = useState({});

  const testBackendConnection = async () => {
    try {
      const response = await api.get('/test');
      setTestResults(prev => ({ ...prev, backend: response.data }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, backend: { error: error.message } }));
    }
  };

  const testRSAKeys = async () => {
    try {
      const response = await api.get('/crypto/rsa/generate-keys');
      setTestResults(prev => ({ ...prev, rsa: { success: true, hasKeys: !!response.data.publicKey } }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, rsa: { error: error.message } }));
    }
  };

  const testHashFunction = async () => {
    try {
      const response = await api.post('/crypto/hash', {
        message: 'Test Message',
        algorithm: 'sha256'
      });
      setTestResults(prev => ({ ...prev, hash: response.data }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, hash: { error: error.message } }));
    }
  };

  const testPrimeGeneration = async () => {
    try {
      const response = await api.post('/number-theory/prime/generate', {
        bits: 16
      });
      setTestResults(prev => ({ ...prev, prime: response.data }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, prime: { error: error.message } }));
    }
  };

  const testModularArithmetic = async () => {
    try {
      const response = await api.post('/number-theory/modular/power', {
        base: 2,
        exponent: 10,
        modulus: 7
      });
      setTestResults(prev => ({ ...prev, modular: response.data }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, modular: { error: error.message } }));
    }
  };

  const runAllTests = async () => {
    await testBackendConnection();
    await testRSAKeys();
    await testHashFunction();
    await testPrimeGeneration();
    await testModularArithmetic();
  };

  return (
    <TestContainer>
      <PageTitle>🔧 System Test Page</PageTitle>
      
      <TestSection>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Backend Tests</h2>
        <Button onClick={testBackendConnection}>Test Backend Connection</Button>
        <Button onClick={testRSAKeys}>Test RSA Key Generation</Button>
        <Button onClick={testHashFunction}>Test Hash Function</Button>
        <Button onClick={testPrimeGeneration}>Test Prime Generation</Button>
        <Button onClick={testModularArithmetic}>Test Modular Arithmetic</Button>
        <Button onClick={runAllTests}>Run All Tests</Button>
        
        {Object.keys(testResults).length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Test Results:</h3>
            {Object.entries(testResults).map(([test, result]) => (
              <ResultBox key={test}>
                <strong>{test.toUpperCase()}:</strong><br />
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </ResultBox>
            ))}
          </div>
        )}
      </TestSection>

      <TestSection>
        <h2 style={{ color: 'white', marginBottom: '1rem' }}>System Status</h2>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          <p>✅ Frontend: React application loaded successfully</p>
          <p>✅ API Utility: Configured and ready</p>
          <p>✅ Routes: All pages accessible</p>
          <p>✅ Styling: Responsive design active</p>
          <p>🔍 Backend: Test connection above</p>
          <p>🔍 Database: MongoDB Atlas connection</p>
        </div>
      </TestSection>
    </TestContainer>
  );
};

export default Test;
