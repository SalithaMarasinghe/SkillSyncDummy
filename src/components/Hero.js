import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  ${props => props.primary ? `
    background-color: #ffffff;
    color: #1a1a1a;
    border: none;
    
    &:hover {
      background-color: #f0f0f0;
    }
  ` : `
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #ffffff;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `}
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: #2a2a2a;
  border-radius: 8px;
`;

function Hero() {
  return (
    <HeroContainer>
      <HeroContent>
        <Title>Share Skills. Learn Together.</Title>
        <Subtitle>
          SkillSync is the go-to platform for individuals eager to share
          their expertise and acquire new skills in a dynamic and
          interactive environment.
        </Subtitle>
        <ButtonGroup>
          <Button to="/signup" primary="true">Get Started</Button>
          <Button to="/about">Learn More</Button>
        </ButtonGroup>
      </HeroContent>
      <ImageContainer>
        <PlaceholderImage />
      </ImageContainer>
    </HeroContainer>
  );
}

export default Hero; 