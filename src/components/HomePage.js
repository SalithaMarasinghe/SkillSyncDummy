import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Footer from './Footer';

const HomePageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #1a1a1a;
  color: #ffffff;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroSection = styled.section`
  width: 100vw;
  padding: 6rem 1rem;
  text-align: center;
  background-color: #2a2a2a;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  text-align: center;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #cccccc;
  margin-bottom: 2rem;
  max-width: 600px;
  text-align: center;
`;

const CTAButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  min-width: 200px;

  &:hover {
    opacity: 0.9;
  }
`;

const FeaturesSection = styled.section`
  width: 100vw;
  padding: 4rem 1rem;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  background-color: #2a2a2a;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
`;

function HomePage() {
  const navigate = useNavigate();

  return (
    <HomePageContainer>
      <Header />
      <ContentWrapper>
        <HeroSection>
          <HeroTitle>Welcome to SkillSync</HeroTitle>
          <HeroSubtitle>
            Connect with fellow learners, share your progress, and achieve your learning goals together.
          </HeroSubtitle>
          <CTAButton onClick={() => navigate('/signup')}>
            Get Started
          </CTAButton>
        </HeroSection>

        <FeaturesSection>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Set Learning Goals</FeatureTitle>
              <FeatureDescription>
                Create personalized learning plans and track your progress towards your goals.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>👥</FeatureIcon>
              <FeatureTitle>Connect with Others</FeatureTitle>
              <FeatureDescription>
                Join a community of learners, share experiences, and learn together.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📈</FeatureIcon>
              <FeatureTitle>Track Progress</FeatureTitle>
              <FeatureDescription>
                Monitor your learning journey with detailed progress tracking and analytics.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>
      </ContentWrapper>
      <HowItWorks />
      <Testimonials />
      <Footer />
    </HomePageContainer>
  );
}

export default HomePage;