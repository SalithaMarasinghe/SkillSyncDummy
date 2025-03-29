import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 2.5rem;
    right: -1rem;
    width: 2rem;
    height: 2px;
    background-color: #ffffff;
  }
`;

const StepNumber = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #ffffff;
  color: #1a1a1a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 1.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
`;

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Create Your Profile',
      description: 'Sign up and customize your profile to showcase your skills and interests.'
    },
    {
      number: 2,
      title: 'Share Your Knowledge',
      description: 'Create posts or learning plans to share your expertise with the community.'
    },
    {
      number: 3,
      title: 'Connect & Learn',
      description: 'Follow others, engage with content, and expand your skill set through community interaction.'
    }
  ];

  return (
    <Section>
      <Title>How SkillSync Works</Title>
      <Description>
        Join our community and start sharing your skills or learning from others in
        just a few simple steps.
      </Description>
      <StepsContainer>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepNumber>{step.number}</StepNumber>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Step>
        ))}
      </StepsContainer>
    </Section>
  );
}

export default HowItWorks; 