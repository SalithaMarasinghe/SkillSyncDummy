import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Feed from './Feed';

const HomeContainer = styled.div`
  width: 100%;
  background-color: #1a1a1a;
  color: #ffffff;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(5px);
  z-index: 1000;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
`;

const LogoIcon = styled.span`
  font-size: 1.8rem;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const WelcomeMessage = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
`;

const HeroSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 100vh;
  padding-top: 10rem;
`;

const HeroContent = styled.div``;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: #808080;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  ${props => props.primary ? `
    background-color: #ffffff;
    color: #1a1a1a;
    &:hover {
      opacity: 0.9;
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

const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: #2a2a2a;
  border-radius: 8px;
`;

const FeaturesSection = styled(Section)`
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const SectionSubtitle = styled.p`
  color: #808080;
  font-size: 1.1rem;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #808080;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const HowItWorksSection = styled(Section)`
  text-align: center;
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`;

const StepCard = styled.div`
  text-align: center;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
`;

const TestimonialsSection = styled(Section)`
  text-align: center;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  text-align: left;
`;

const Stars = styled.div`
  color: #ffd700;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  color: #ffffff;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #808080;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 500;
`;

const AuthorTitle = styled.div`
  color: #808080;
  font-size: 0.8rem;
`;

const CTASection = styled(Section)`
  text-align: center;
`;

function Home() {
  const { user } = useSelector(state => state.user);

  const renderHeader = () => (
    <Header>
      <HeaderContent>
        <Logo to="/">
          <LogoIcon>🔄</LogoIcon>
          SkillSync
        </Logo>
        {!user && (
          <AuthButtons>
            <Button as={Link} to="/login">Log In</Button>
            <Button as={Link} to="/signup" primary>Sign Up</Button>
          </AuthButtons>
        )}
      </HeaderContent>
    </Header>
  );

  if (user) {
    return (
      <HomeContainer>
        {renderHeader()}
        <Section>
          <WelcomeMessage>Welcome back, {user.firstName}!</WelcomeMessage>
          <Feed />
        </Section>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      {renderHeader()}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Share Skills. Learn Together.</HeroTitle>
          <HeroSubtitle>
            SkillSync is the go-to platform for individuals eager to share
            their expertise and acquire new skills in a dynamic and
            interactive environment.
          </HeroSubtitle>
          <ButtonGroup>
            <Button to="/signup" primary>Get Started</Button>
            <Button to="/about">Learn More</Button>
          </ButtonGroup>
        </HeroContent>
        <HeroImage />
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>What Makes SkillSync Unique</SectionTitle>
        <SectionSubtitle>
          SkillSync blends the best aspects of social engagement with structured
          learning, offering an experience akin to platforms like Udemy and
          Skillshare.
        </SectionSubtitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🔄</FeatureIcon>
            <FeatureTitle>Skill-Sharing Posts</FeatureTitle>
            <FeatureDescription>
              Upload up to three photos or short videos with detailed descriptions to highlight your expertise.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>📋</FeatureIcon>
            <FeatureTitle>Learning Plans</FeatureTitle>
            <FeatureDescription>
              Create and share structured learning paths with goals, milestones, and timelines.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Community Engagement</FeatureTitle>
            <FeatureDescription>
              Like, comment, and follow others to foster collaboration and interaction.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <HowItWorksSection>
        <SectionTitle>How SkillSync Works</SectionTitle>
        <SectionSubtitle>
          Join our community and start sharing your skills or learning from others in
          just a few simple steps.
        </SectionSubtitle>
        <StepGrid>
          <StepCard>
            <StepNumber>1</StepNumber>
            <FeatureTitle>Create Your Profile</FeatureTitle>
            <FeatureDescription>
              Sign up and customize your profile to showcase your skills and interests.
            </FeatureDescription>
          </StepCard>
          <StepCard>
            <StepNumber>2</StepNumber>
            <FeatureTitle>Share Your Knowledge</FeatureTitle>
            <FeatureDescription>
              Create posts or learning plans to share your expertise with the community.
            </FeatureDescription>
          </StepCard>
          <StepCard>
            <StepNumber>3</StepNumber>
            <FeatureTitle>Connect & Learn</FeatureTitle>
            <FeatureDescription>
              Follow others, engage with content, and expand your skill set through community interaction.
            </FeatureDescription>
          </StepCard>
        </StepGrid>
      </HowItWorksSection>

      <TestimonialsSection>
        <SectionTitle>What Our Users Say</SectionTitle>
        <SectionSubtitle>
          Hear from our community members who have transformed their learning
          journey with SkillSync.
        </SectionSubtitle>
        <TestimonialGrid>
          <TestimonialCard>
            <Stars>⭐⭐⭐⭐⭐</Stars>
            <TestimonialText>
              "SkillSync transformed how I learn photography. The community feedback helped me improve faster than any course could."
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar />
              <AuthorInfo>
                <AuthorName>Alex Johnson</AuthorName>
                <AuthorTitle>Photography Enthusiast</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <Stars>⭐⭐⭐⭐⭐</Stars>
            <TestimonialText>
              "As a coding instructor, SkillSync gives me a platform to share my knowledge and connect with students in a meaningful way."
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar />
              <AuthorInfo>
                <AuthorName>Maria Rodriguez</AuthorName>
                <AuthorTitle>Software Developer</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <Stars>⭐⭐⭐⭐⭐</Stars>
            <TestimonialText>
              "The learning plans feature helped me structure my journey into culinary arts. I've learned more in 3 months than I did in a year on my own."
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar />
              <AuthorInfo>
                <AuthorName>David Chen</AuthorName>
                <AuthorTitle>Culinary Enthusiast</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialsSection>

      <CTASection>
        <SectionTitle>Ready to Join SkillSync?</SectionTitle>
        <SectionSubtitle>
          Start sharing your skills and learning from others today.
        </SectionSubtitle>
        <Button to="/signup" primary>Log In Now</Button>
      </CTASection>
    </HomeContainer>
  );
}

export default Home; 