import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
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
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
`;

function Features() {
  const features = [
    {
      title: 'Skill-Sharing Posts',
      description: 'Upload up to five photos or short videos with detailed descriptions to highlight your expertise.',
      icon: '🔄'
    },
    {
      title: 'Learning Plans',
      description: 'Create and share structured learning paths with clear objectives, milestones, and timelines.',
      icon: '📚'
    },
    {
      title: 'Community Engagement',
      description: 'Like, comment, and follow others to foster collaboration and interaction.',
      icon: '👥'
    },
    {
      title: 'Personalized Profiles',
      description: 'Showcase your skills and learning journey through a dedicated public profile.',
      icon: '👤'
    },
    {
      title: 'Real-Time Notifications',
      description: 'Stay updated on likes, comments, and interactions with your content.',
      icon: '🔔'
    },
    {
      title: 'Seamless Authentication',
      description: 'Effortless login with OAuth 2.0 for a secure and user-friendly experience.',
      icon: '🔒'
    }
  ];

  return (
    <FeaturesSection>
      <SectionTitle>What Makes SkillSync Unique</SectionTitle>
      <SectionSubtitle>
        SkillSync blends the best aspects of social engagement with structured
        learning, offering an experience akin to platforms like Udemy and
        Skillshare.
      </SectionSubtitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
}

export default Features; 