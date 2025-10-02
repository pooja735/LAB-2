import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../utils/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const VisualizationsContainer = styled.div`
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

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
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

const Visualizations = () => {
  const [rsaData, setRsaData] = useState(null);
  const [primeData, setPrimeData] = useState(null);
  const [modularData, setModularData] = useState(null);
  const [hashData, setHashData] = useState(null);
  const [loading, setLoading] = useState({});

  const [primeRange, setPrimeRange] = useState({ start: 1, end: 100 });
  const [modularParams, setModularParams] = useState({ base: 2, modulus: 7 });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        color: 'white'
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const loadRSAVisualization = async () => {
    setLoading(prev => ({ ...prev, rsa: true }));
    try {
      const response = await api.get('/visualization/rsa/key-sizes');
      setRsaData(response.data);
    } catch (error) {
      console.error('Error loading RSA data:', error);
    }
    setLoading(prev => ({ ...prev, rsa: false }));
  };

  const loadPrimeDistribution = async () => {
    setLoading(prev => ({ ...prev, prime: true }));
    try {
      const response = await api.get('/visualization/primes/distribution', {
        params: primeRange
      });
      setPrimeData(response.data);
    } catch (error) {
      console.error('Error loading prime data:', error);
    }
    setLoading(prev => ({ ...prev, prime: false }));
  };

  const loadModularCycle = async () => {
    setLoading(prev => ({ ...prev, modular: true }));
    try {
      const response = await api.get('/visualization/modular/cycle', {
        params: modularParams
      });
      setModularData(response.data);
    } catch (error) {
      console.error('Error loading modular data:', error);
    }
    setLoading(prev => ({ ...prev, modular: false }));
  };

  const loadHashCollision = async () => {
    setLoading(prev => ({ ...prev, hash: true }));
    try {
      const response = await api.get('/visualization/hash/collision', {
        params: { algorithm: 'md5', inputLength: 4 }
      });
      setHashData(response.data);
    } catch (error) {
      console.error('Error loading hash data:', error);
    }
    setLoading(prev => ({ ...prev, hash: false }));
  };

  useEffect(() => {
    loadRSAVisualization();
    loadPrimeDistribution();
    loadModularCycle();
    loadHashCollision();
  }, []);

  const rsaChartData = rsaData ? {
    labels: rsaData.map(item => `${item.keySize} bits`),
    datasets: [
      {
        label: 'Security Level',
        data: rsaData.map(item => {
          const levels = { 'Weak': 1, 'Moderate': 2, 'Strong': 3, 'Very Strong': 4 };
          return levels[item.securityLevel];
        }),
        backgroundColor: 'rgba(102, 126, 234, 0.6)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
      }
    ]
  } : null;

  const primeChartData = primeData ? {
    labels: primeData.primes.map(p => p.number.toString()),
    datasets: [
      {
        label: 'Prime Numbers',
        data: primeData.primes.map(p => 1),
        backgroundColor: 'rgba(118, 75, 162, 0.6)',
        borderColor: 'rgba(118, 75, 162, 1)',
        borderWidth: 1,
      }
    ]
  } : null;

  const modularChartData = modularData ? {
    labels: modularData.cycle.map(item => `Power ${item.power}`),
    datasets: [
      {
        label: 'Modular Power Cycle',
        data: modularData.cycle.map(item => item.value),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
      }
    ]
  } : null;

  const hashChartData = hashData ? {
    labels: ['Unique Hashes', 'Collisions'],
    datasets: [
      {
        data: [hashData.uniqueHashes, hashData.collisions.length],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 2,
      }
    ]
  } : null;

  return (
    <VisualizationsContainer>
      <PageTitle>Interactive Visualizations</PageTitle>
      
      <Section>
        <SectionTitle>🔐 RSA Key Size Security Analysis</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Visualization of RSA key sizes and their corresponding security levels.
        </p>
        
        <Button onClick={loadRSAVisualization} disabled={loading.rsa}>
          {loading.rsa && <LoadingSpinner />}
          Load RSA Data
        </Button>
        
        {rsaChartData && (
          <ChartContainer>
            <Bar 
              data={rsaChartData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: 'RSA Key Size vs Security Level'
                  }
                }
              }} 
            />
            <div style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              <strong>Security Recommendations:</strong><br />
              • 512-bit: Weak (deprecated)<br />
              • 1024-bit: Moderate (being phased out)<br />
              • 2048-bit: Strong (current standard)<br />
              • 4096-bit: Very Strong (future-proof)
            </div>
          </ChartContainer>
        )}
      </Section>

      <GridContainer>
        <Section>
          <SectionTitle>🔢 Prime Number Distribution</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Distribution of prime numbers in a given range.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <InputGroup>
              <Label>Start Range:</Label>
              <Input
                type="number"
                value={primeRange.start}
                onChange={(e) => setPrimeRange(prev => ({ ...prev, start: parseInt(e.target.value) }))}
                min="1"
              />
            </InputGroup>
            
            <InputGroup>
              <Label>End Range:</Label>
              <Input
                type="number"
                value={primeRange.end}
                onChange={(e) => setPrimeRange(prev => ({ ...prev, end: parseInt(e.target.value) }))}
                min="2"
                max="1000"
              />
            </InputGroup>
          </div>
          
          <Button onClick={loadPrimeDistribution} disabled={loading.prime}>
            {loading.prime && <LoadingSpinner />}
            Generate Prime Distribution
          </Button>
          
          {primeChartData && (
            <ChartContainer>
              <Bar 
                data={primeChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: `Prime Numbers in Range ${primeRange.start}-${primeRange.end}`
                    }
                  }
                }} 
              />
              <div style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                <strong>Statistics:</strong><br />
                Total Primes: {primeData?.count}<br />
                Density: {(primeData?.density * 100).toFixed(2)}%
              </div>
            </ChartContainer>
          )}
        </Section>

        <Section>
          <SectionTitle>⚡ Modular Arithmetic Cycles</SectionTitle>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Visualization of modular power cycles showing periodicity.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <InputGroup>
              <Label>Base:</Label>
              <Input
                type="number"
                value={modularParams.base}
                onChange={(e) => setModularParams(prev => ({ ...prev, base: parseInt(e.target.value) }))}
                min="1"
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Modulus:</Label>
              <Input
                type="number"
                value={modularParams.modulus}
                onChange={(e) => setModularParams(prev => ({ ...prev, modulus: parseInt(e.target.value) }))}
                min="2"
              />
            </InputGroup>
          </div>
          
          <Button onClick={loadModularCycle} disabled={loading.modular}>
            {loading.modular && <LoadingSpinner />}
            Generate Cycle
          </Button>
          
          {modularChartData && (
            <ChartContainer>
              <Line 
                data={modularChartData} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: `Modular Power Cycle: ${modularParams.base}^n mod ${modularParams.modulus}`
                    }
                  }
                }} 
              />
              <div style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                <strong>Cycle Properties:</strong><br />
                Cycle Length: {modularData?.cycleLength}<br />
                Primitive Root: {modularData?.isPrimitive ? 'Yes' : 'No'}
              </div>
            </ChartContainer>
          )}
        </Section>
      </GridContainer>

      <Section>
        <SectionTitle>📊 Hash Function Collision Analysis</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Analysis of hash collisions in MD5 algorithm with random inputs.
        </p>
        
        <Button onClick={loadHashCollision} disabled={loading.hash}>
          {loading.hash && <LoadingSpinner />}
          Analyze Hash Collisions
        </Button>
        
        {hashChartData && (
          <ChartContainer>
            <Doughnut 
              data={hashChartData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: 'Hash Collision Analysis (MD5)'
                  }
                }
              }} 
            />
            <div style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              <strong>Collision Statistics:</strong><br />
              Total Inputs: {hashData?.totalInputs}<br />
              Unique Hashes: {hashData?.uniqueHashes}<br />
              Collisions: {hashData?.collisions.length}<br />
              Collision Rate: {(hashData?.collisionRate * 100).toFixed(2)}%
            </div>
          </ChartContainer>
        )}
      </Section>

      <Section>
        <SectionTitle>📈 Mathematical Relationships</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <p><strong>Visualization Insights:</strong></p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li><strong>RSA Security:</strong> Exponential relationship between key size and security level</li>
            <li><strong>Prime Distribution:</strong> Primes become less dense as numbers get larger (Prime Number Theorem)</li>
            <li><strong>Modular Cycles:</strong> Show periodicity and help understand primitive roots</li>
            <li><strong>Hash Collisions:</strong> Demonstrate the birthday paradox in cryptographic contexts</li>
          </ul>
          <br />
          <p><strong>Cryptographic Implications:</strong></p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Larger key sizes provide exponentially better security</li>
            <li>Prime number distribution affects key generation efficiency</li>
            <li>Modular arithmetic cycles are fundamental to many cryptographic algorithms</li>
            <li>Hash collision resistance is crucial for digital signatures and integrity</li>
          </ul>
        </div>
      </Section>
    </VisualizationsContainer>
  );
};

export default Visualizations;
