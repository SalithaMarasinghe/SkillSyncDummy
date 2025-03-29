import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(26, 26, 26, 0.95);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  
  ${props => props.primary ? `
    background-color: #ffffff;
    color: #1a1a1a;
    border: none;
  ` : `
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #ffffff;
  `}
  
  &:hover {
    opacity: 0.9;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo to="/">SkillSync</Logo>
      <Nav>
        <NavLink>Features</NavLink>
        <NavLink>How It Works</NavLink>
        <NavLink>Testimonials</NavLink>
      </Nav>
      <AuthButtons>
        <Button to="/login">Log In</Button>
        <Button to="/signup" primary="true">Sign Up</Button>
      </AuthButtons>
    </HeaderContainer>
  );
}

export default Header; 