import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EllipticCurvesContainer = styled.div`
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

const PointsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const PointCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const PointCoords = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
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

const CurveVisualization = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
`;

const Canvas = styled.canvas`
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
  max-width: 100%;
`;

const EllipticCurves = () => {
  const [curveParams, setCurveParams] = useState({ a: 1, b: 1, p: 23 });
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canvasRef, setCanvasRef] = useState(null);

  const generatePoints = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/visualization/elliptic-curve/points', {
        params: curveParams
      });
      setPoints(response.data.points);
    } catch (error) {
      console.error('Error generating points:', error);
    }
    setLoading(false);
  };

  const drawCurve = () => {
    if (!canvasRef) return;

    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, width, height);

    // Set up drawing parameters
    const scale = Math.min(width, height) / (curveParams.p + 2);
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= curveParams.p; i++) {
      const x = centerX - (curveParams.p * scale) / 2 + i * scale;
      const y = centerY - (curveParams.p * scale) / 2 + i * scale;
      
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(x, centerY - (curveParams.p * scale) / 2);
      ctx.lineTo(x, centerY + (curveParams.p * scale) / 2);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(centerX - (curveParams.p * scale) / 2, y);
      ctx.lineTo(centerX + (curveParams.p * scale) / 2, y);
      ctx.stroke();
    }

    // Draw points
    ctx.fillStyle = '#667eea';
    ctx.strokeStyle = '#e0e7ff';
    ctx.lineWidth = 2;

    points.forEach(point => {
      const x = centerX - (curveParams.p * scale) / 2 + point.x * scale;
      const y = centerY - (curveParams.p * scale) / 2 + point.y * scale;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      
      // Draw coordinates
      ctx.fillStyle = 'white';
      ctx.font = '10px monospace';
      ctx.fillText(`(${point.x},${point.y})`, x + 6, y - 6);
      ctx.fillStyle = '#667eea';
    });

    // Draw curve equation
    ctx.fillStyle = 'white';
    ctx.font = '14px monospace';
    ctx.fillText(`y² = x³ + ${curveParams.a}x + ${curveParams.b} (mod ${curveParams.p})`, 10, 20);
  };

  useEffect(() => {
    if (points.length > 0) {
      drawCurve();
    }
  }, [points, curveParams]);

  const handleParamChange = (param, value) => {
    setCurveParams(prev => ({
      ...prev,
      [param]: parseInt(value) || 0
    }));
  };

  const calculatePointAddition = (p1, p2) => {
    if (!p1 || !p2) return null;
    
    const { a, p } = curveParams;
    
    // Point at infinity case
    if (p1.x === p2.x && p1.y === p2.y) {
      // Point doubling
      const slope = ((3 * p1.x * p1.x + a) * modInverse(2 * p1.y, p)) % p;
      const x3 = (slope * slope - 2 * p1.x) % p;
      const y3 = (slope * (p1.x - x3) - p1.y) % p;
      return { x: (x3 + p) % p, y: (y3 + p) % p };
    } else {
      // Point addition
      const slope = ((p2.y - p1.y) * modInverse(p2.x - p1.x, p)) % p;
      const x3 = (slope * slope - p1.x - p2.x) % p;
      const y3 = (slope * (p1.x - x3) - p1.y) % p;
      return { x: (x3 + p) % p, y: (y3 + p) % p };
    }
  };

  const modInverse = (a, m) => {
    // Extended Euclidean Algorithm
    let [oldR, r] = [a, m];
    let [oldS, s] = [1, 0];
    
    while (r !== 0) {
      const quotient = Math.floor(oldR / r);
      [oldR, r] = [r, oldR - quotient * r];
      [oldS, s] = [s, oldS - quotient * s];
    }
    
    return oldS < 0 ? oldS + m : oldS;
  };

  return (
    <EllipticCurvesContainer>
      <PageTitle>Elliptic Curve Cryptography</PageTitle>
      
      <Section>
        <SectionTitle>🌊 Elliptic Curve Parameters</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Elliptic curves are defined by the equation: y² = x³ + ax + b (mod p)
          where a, b are curve parameters and p is a prime modulus.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <InputGroup>
            <Label>Parameter a:</Label>
            <Input
              type="number"
              value={curveParams.a}
              onChange={(e) => handleParamChange('a', e.target.value)}
              placeholder="Enter a..."
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Parameter b:</Label>
            <Input
              type="number"
              value={curveParams.b}
              onChange={(e) => handleParamChange('b', e.target.value)}
              placeholder="Enter b..."
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Prime Modulus p:</Label>
            <Input
              type="number"
              value={curveParams.p}
              onChange={(e) => handleParamChange('p', e.target.value)}
              placeholder="Enter p..."
            />
          </InputGroup>
        </div>
        
        <Button onClick={generatePoints} disabled={loading}>
          {loading && <LoadingSpinner />}
          Generate Curve Points
        </Button>
        
        {points.length > 0 && (
          <ResultBox>
            <strong>Curve Information:</strong><br />
            <div style={{ marginTop: '0.5rem' }}>
              <div>Equation: y² = x³ + {curveParams.a}x + {curveParams.b} (mod {curveParams.p})</div>
              <div>Total Points: {points.length}</div>
              <div>Field Size: {curveParams.p}</div>
            </div>
          </ResultBox>
        )}
      </Section>

      <Section>
        <SectionTitle>📊 Curve Visualization</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Visual representation of the elliptic curve points over the finite field.
        </p>
        
        {points.length > 0 && (
          <CurveVisualization>
            <Canvas
              ref={setCanvasRef}
              width={600}
              height={400}
            />
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              Each point represents a valid (x, y) pair that satisfies the elliptic curve equation.
            </div>
          </CurveVisualization>
        )}
      </Section>

      <Section>
        <SectionTitle>🔢 Curve Points</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          All valid points on the elliptic curve over the finite field.
        </p>
        
        {points.length > 0 && (
          <PointsGrid>
            {points.map((point, index) => (
              <PointCard key={index}>
                <PointCoords>({point.x}, {point.y})</PointCoords>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Point #{index + 1}
                </div>
              </PointCard>
            ))}
          </PointsGrid>
        )}
      </Section>

      <Section>
        <SectionTitle>➕ Point Addition Demo</SectionTitle>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
          Demonstration of elliptic curve point addition. Select two points to see their sum.
        </p>
        
        {points.length > 0 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <InputGroup>
                <Label>Point 1 (x, y):</Label>
                <Input
                  type="text"
                  placeholder="e.g., 1,2"
                  onChange={(e) => {
                    const [x, y] = e.target.value.split(',').map(n => parseInt(n.trim()));
                    if (x !== undefined && y !== undefined) {
                      const sum = calculatePointAddition({ x, y }, { x: 2, y: 3 });
                      console.log('Sum:', sum);
                    }
                  }}
                />
              </InputGroup>
              
              <InputGroup>
                <Label>Point 2 (x, y):</Label>
                <Input
                  type="text"
                  placeholder="e.g., 2,3"
                />
              </InputGroup>
            </div>
            
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.3)', 
              padding: '1rem', 
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              <strong>Point Addition Rules:</strong><br />
              <div style={{ marginTop: '0.5rem' }}>
                <div>• If P₁ = P₂ (point doubling): slope = (3x₁² + a) / (2y₁)</div>
                <div>• If P₁ ≠ P₂: slope = (y₂ - y₁) / (x₂ - x₁)</div>
                <div>• x₃ = slope² - x₁ - x₂</div>
                <div>• y₃ = slope(x₁ - x₃) - y₁</div>
                <div>• All operations are performed modulo p</div>
              </div>
            </div>
          </div>
        )}
      </Section>

      <Section>
        <SectionTitle>📚 Elliptic Curve Cryptography</SectionTitle>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
          <p><strong>Elliptic Curve Cryptography (ECC)</strong> is a public-key cryptosystem based on the algebraic structure of elliptic curves over finite fields.</p>
          <br />
          <p><strong>Advantages over RSA:</strong></p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Smaller key sizes for equivalent security</li>
            <li>Faster computation</li>
            <li>Lower power consumption</li>
            <li>Better performance on mobile devices</li>
          </ul>
          <br />
          <p><strong>Security Levels:</strong></p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>160-bit ECC ≈ 1024-bit RSA</li>
            <li>224-bit ECC ≈ 2048-bit RSA</li>
            <li>256-bit ECC ≈ 3072-bit RSA</li>
            <li>384-bit ECC ≈ 7680-bit RSA</li>
          </ul>
          <br />
          <p><strong>Applications:</strong></p>
          <ul style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
            <li>Bitcoin and other cryptocurrencies</li>
            <li>SSL/TLS certificates</li>
            <li>Digital signatures</li>
            <li>Key exchange protocols</li>
          </ul>
        </div>
      </Section>
    </EllipticCurvesContainer>
  );
};

export default EllipticCurves;
