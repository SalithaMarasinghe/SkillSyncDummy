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

const TestimonialsGrid = styled.div`
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
  font-size: 1.2rem;
`;

const Quote = styled.p`
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #ffffff;
  border-radius: 50%;
`;

const UserDetails = styled.div`
  text-align: left;
`;

const UserName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
`;

const UserRole = styled.p`
  color: #cccccc;
  font-size: 0.9rem;
`;

function Testimonials() {
  const testimonials = [
    {
      stars: 5,
      quote: "SkillSync transformed how I learn photography. The community feedback helped me improve faster than any course could.",
      name: "Alex Johnson",
      role: "Photography Enthusiast"
    },
    {
      stars: 5,
      quote: "As a coding instructor, SkillSync gives me a platform to share my knowledge and connect with students in a meaningful way.",
      name: "Maria Rodriguez",
      role: "Software Developer"
    },
    {
      stars: 5,
      quote: "The learning plans feature helped me structure my journey into culinary arts. I've learned more in 3 months than I did in a year on my own.",
      name: "David Chen",
      role: "Culinary Enthusiast"
    }
  ];

  return (
    <Section>
      <Title>What Our Users Say</Title>
      <Description>
        Hear from our community members who have transformed their learning
        journey with SkillSync.
      </Description>
      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <Stars>{"★".repeat(testimonial.stars)}</Stars>
            <Quote>"{testimonial.quote}"</Quote>
            <UserInfo>
              <Avatar />
              <UserDetails>
                <UserName>{testimonial.name}</UserName>
                <UserRole>{testimonial.role}</UserRole>
              </UserDetails>
            </UserInfo>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </Section>
  );
}

export default Testimonials; 