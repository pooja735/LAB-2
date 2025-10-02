import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  z-index: 1000;
  padding: 0 2rem;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #58a6ff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #161b22;
    border-bottom: 1px solid #30363d;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? '#58a6ff' : '#f0f6fc'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '500'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #58a6ff;
    background: rgba(88, 166, 255, 0.1);
  }

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: #58a6ff;
      border-radius: 1px;
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/prime-numbers', label: 'Prime Numbers' },
    { path: '/cipher-demo', label: 'Cipher Demo' },
    { path: '/rsa-key-gen', label: 'RSA Key Gen' },
    { path: '/history-info', label: 'History & Info' }
  ];

  return (
    <Nav>
      <Logo to="/">
        🔐 Cryptography Lab
      </Logo>
      
      <NavLinks isOpen={isOpen}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </NavLinks>

      <MobileMenuButton onClick={toggleMenu}>
        ☰
      </MobileMenuButton>
    </Nav>
  );
};

export default Navbar;
