import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2a2a2a;
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CTASection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #404040;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const FooterLink = styled.a`
  display: block;
  color: #cccccc;
  text-decoration: none;
  margin-bottom: 0.75rem;
  
  &:hover {
    color: #ffffff;
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: #cccccc;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #404040;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <CTASection>
          <CTATitle>Ready to Join SkillSync?</CTATitle>
          <CTADescription>
            Start sharing your skills and learning from others today.
          </CTADescription>
          <CTAButton>Log In Now</CTAButton>
        </CTASection>
        
        <FooterGrid>
          <FooterColumn>
            <FooterLogo>SkillSync</FooterLogo>
            <FooterDescription>
              The go-to platform for individuals eager to share their expertise
              and acquire new skills in a dynamic and interactive environment.
            </FooterDescription>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Company</ColumnTitle>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Press</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Resources</ColumnTitle>
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Community</FooterLink>
            <FooterLink href="#">Tutorials</FooterLink>
            <FooterLink href="#">Partners</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>Legal</ColumnTitle>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
          </FooterColumn>
        </FooterGrid>
        
        <Copyright>
          © 2023 SkillSync. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 