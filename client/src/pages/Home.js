import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: #0d1117;
  min-height: 100vh;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0;
  color: #f0f6fc;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #58a6ff 0%, #f85149 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(Link)`
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  color: #f0f6fc;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-5px);
    background: #21262d;
    border-color: #58a6ff;
    box-shadow: 0 10px 30px rgba(88, 166, 255, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  opacity: 0.8;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  margin-top: 4rem;
  text-align: center;
`;

const StatsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
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

const Home = () => {
  const features = [
    {
      path: '/prime-numbers',
      icon: '🔢',
      title: 'Prime Numbers & Modular Arithmetic',
      description: 'Prime checking, factorization, modular inverse, and interactive visualizations'
    },
    {
      path: '/cipher-demo',
      icon: '🔐',
      title: 'Cipher Demonstration',
      description: 'Caesar, Affine, and RSA ciphers with character shift animations and frequency analysis'
    },
    {
      path: '/rsa-key-gen',
      icon: '🗝️',
      title: 'RSA Key Generation',
      description: 'Step-by-step RSA key generation with mathematical explanations and flowcharts'
    },
    {
      path: '/history-info',
      icon: '📚',
      title: 'History & Educational Info',
      description: 'Learn about GCD, modular arithmetic, Euler\'s totient function with interactive examples'
    }
  ];

  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>Cryptography & Number Theory Lab</HeroTitle>
        <HeroSubtitle>
          Explore advanced mathematical concepts in cryptography through interactive tools, 
          visualizations, and real-time demonstrations of cryptographic algorithms.
        </HeroSubtitle>
      </Hero>

      <FeatureGrid>
        {features.map(feature => (
          <FeatureCard key={feature.path} to={feature.path}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>

      <StatsSection>
        <StatsTitle>Application Features</StatsTitle>
        <StatsGrid>
          <StatCard>
            <StatNumber>4</StatNumber>
            <StatLabel>Main Modules</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>3</StatNumber>
            <StatLabel>Cipher Types</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>5+</StatNumber>
            <StatLabel>Interactive Visualizations</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>100%</StatNumber>
            <StatLabel>Educational Focus</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home;
