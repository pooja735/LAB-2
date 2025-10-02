import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../utils/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
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

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HistoryItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const AlgorithmBadge = styled.span`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const OperationBadge = styled.span`
  background: ${props => {
    const colors = {
      'encrypt': 'rgba(34, 197, 94, 0.2)',
      'decrypt': 'rgba(239, 68, 68, 0.2)',
      'hash': 'rgba(59, 130, 246, 0.2)',
      'generate': 'rgba(168, 85, 247, 0.2)'
    };
    return colors[props.operation] || 'rgba(107, 114, 128, 0.2)';
  }};
  color: ${props => {
    const colors = {
      'encrypt': '#22c55e',
      'decrypt': '#ef4444',
      'hash': '#3b82f6',
      'generate': '#a855f7'
    };
    return colors[props.operation] || '#6b7280';
  }};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Timestamp = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const HistoryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DataBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
`;

const DataLabel = styled.div`
  color: #e0e7ff;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const DataValue = styled.div`
  color: white;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  word-break: break-all;
  line-height: 1.4;
`;

const CopyButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
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

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  padding: 3rem;
  font-size: 1.1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #e0e7ff;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
`;

const History = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    algorithm: 'all',
    operation: 'all'
  });
  const [copied, setCopied] = useState('');

  const loadHistory = async () => {
    setLoading(true);
    try {
      const response = await api.get('/crypto/history');
      setHistory(response.data);
      setFilteredHistory(response.data);
    } catch (error) {
      console.error('Error loading history:', error);
      // Set empty arrays if history can't be loaded
      setHistory([]);
      setFilteredHistory([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    let filtered = history;

    if (filters.algorithm !== 'all') {
      filtered = filtered.filter(item => item.algorithm.toLowerCase() === filters.algorithm.toLowerCase());
    }

    if (filters.operation !== 'all') {
      filtered = filtered.filter(item => item.operation === filters.operation);
    }

    setFilteredHistory(filtered);
  }, [filters, history]);

  const handleCopy = (text, id) => {
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const getUniqueAlgorithms = () => {
    const algorithms = [...new Set(history.map(item => item.algorithm))];
    return algorithms;
  };

  const getUniqueOperations = () => {
    const operations = [...new Set(history.map(item => item.operation))];
    return operations;
  };

  const getStats = () => {
    const total = history.length;
    const byAlgorithm = history.reduce((acc, item) => {
      acc[item.algorithm] = (acc[item.algorithm] || 0) + 1;
      return acc;
    }, {});
    const byOperation = history.reduce((acc, item) => {
      acc[item.operation] = (acc[item.operation] || 0) + 1;
      return acc;
    }, {});

    return { total, byAlgorithm, byOperation };
  };

  const stats = getStats();

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <HistoryContainer>
      <PageTitle>Operation History</PageTitle>
      
      <Section>
        <SectionTitle>📊 Statistics Overview</SectionTitle>
        <StatsContainer>
          <StatCard>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Total Operations</StatLabel>
          </StatCard>
          {Object.entries(stats.byAlgorithm).map(([algorithm, count]) => (
            <StatCard key={algorithm}>
              <StatNumber>{count}</StatNumber>
              <StatLabel>{algorithm} Operations</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </Section>

      <Section>
        <SectionTitle>🔍 Filter Operations</SectionTitle>
        <FilterContainer>
          <div>
            <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Algorithm:
            </label>
            <Select
              value={filters.algorithm}
              onChange={(e) => setFilters(prev => ({ ...prev, algorithm: e.target.value }))}
            >
              <option value="all">All Algorithms</option>
              {getUniqueAlgorithms().map(algorithm => (
                <option key={algorithm} value={algorithm.toLowerCase()}>
                  {algorithm}
                </option>
              ))}
            </Select>
          </div>
          
          <div>
            <label style={{ color: 'white', display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Operation:
            </label>
            <Select
              value={filters.operation}
              onChange={(e) => setFilters(prev => ({ ...prev, operation: e.target.value }))}
            >
              <option value="all">All Operations</option>
              {getUniqueOperations().map(operation => (
                <option key={operation} value={operation}>
                  {operation.charAt(0).toUpperCase() + operation.slice(1)}
                </option>
              ))}
            </Select>
          </div>
        </FilterContainer>
      </Section>

      <Section>
        <SectionTitle>📚 Operation History</SectionTitle>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            <LoadingSpinner />
            Loading history...
          </div>
        ) : filteredHistory.length === 0 ? (
          <EmptyState>
            {history.length === 0 
              ? 'No operations performed yet. Start using the cryptographic tools to see your history here!'
              : 'No operations match the current filters. Try adjusting your filter criteria.'
            }
          </EmptyState>
        ) : (
          <HistoryList>
            {filteredHistory.map((item, index) => (
              <HistoryItem key={item._id || index}>
                <HistoryHeader>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <AlgorithmBadge>{item.algorithm}</AlgorithmBadge>
                    <OperationBadge operation={item.operation}>
                      {item.operation.charAt(0).toUpperCase() + item.operation.slice(1)}
                    </OperationBadge>
                  </div>
                  <Timestamp>{formatTimestamp(item.timestamp)}</Timestamp>
                </HistoryHeader>
                
                <HistoryContent>
                  <DataBox>
                    <DataLabel>Input:</DataLabel>
                    <DataValue>{truncateText(item.input)}</DataValue>
                    <CopyToClipboard text={item.input} onCopy={() => handleCopy(item.input, `input-${index}`)}>
                      <CopyButton>
                        {copied === `input-${index}` ? '✓ Copied!' : 'Copy Input'}
                      </CopyButton>
                    </CopyToClipboard>
                  </DataBox>
                  
                  <DataBox>
                    <DataLabel>Output:</DataLabel>
                    <DataValue>{truncateText(item.output)}</DataValue>
                    <CopyToClipboard text={item.output} onCopy={() => handleCopy(item.output, `output-${index}`)}>
                      <CopyButton>
                        {copied === `output-${index}` ? '✓ Copied!' : 'Copy Output'}
                      </CopyButton>
                    </CopyToClipboard>
                  </DataBox>
                </HistoryContent>
                
                {item.key && (
                  <DataBox>
                    <DataLabel>Key:</DataLabel>
                    <DataValue>{truncateText(item.key)}</DataValue>
                    <CopyToClipboard text={item.key} onCopy={() => handleCopy(item.key, `key-${index}`)}>
                      <CopyButton>
                        {copied === `key-${index}` ? '✓ Copied!' : 'Copy Key'}
                      </CopyButton>
                    </CopyToClipboard>
                  </DataBox>
                )}
                
                {item.parameters && Object.keys(item.parameters).length > 0 && (
                  <DataBox>
                    <DataLabel>Parameters:</DataLabel>
                    <DataValue>
                      {Object.entries(item.parameters).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '0.25rem' }}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                    </DataValue>
                  </DataBox>
                )}
              </HistoryItem>
            ))}
          </HistoryList>
        )}
      </Section>

      <Section>
        <SectionTitle>ℹ️ About Operation History</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <p>This page displays a comprehensive history of all cryptographic operations performed in the application.</p>
          <br />
          <p><strong>Features:</strong></p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Real-time operation tracking</li>
            <li>Filter by algorithm and operation type</li>
            <li>Copy input/output data for reuse</li>
            <li>Detailed parameter information</li>
            <li>Timestamp tracking for audit purposes</li>
          </ul>
          <br />
          <p><strong>Security Note:</strong> All operations are logged for educational and debugging purposes. In production environments, consider implementing proper audit logging with appropriate security measures.</p>
        </div>
      </Section>
    </HistoryContainer>
  );
};

export default History;
