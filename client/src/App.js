import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PrimeNumbers from './pages/PrimeNumbers';
import CipherDemo from './pages/CipherDemo';
import RSAKeyGen from './pages/RSAKeyGen';
import HistoryInfo from './pages/HistoryInfo';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #0d1117;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
`;

const MainContent = styled.main`
  padding-top: 80px;
  min-height: calc(100vh - 80px);
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prime-numbers" element={<PrimeNumbers />} />
            <Route path="/cipher-demo" element={<CipherDemo />} />
            <Route path="/rsa-key-gen" element={<RSAKeyGen />} />
            <Route path="/history-info" element={<HistoryInfo />} />
          </Routes>
        </MainContent>
      </Router>
    </AppContainer>
  );
}

export default App;
