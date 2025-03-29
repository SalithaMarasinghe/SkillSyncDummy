import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SignUpContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #1a1a1a;
  color: #ffffff;
`;

const Logo = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormContainer = styled.div`
  flex: 1;
  max-width: 480px;
  margin: auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #cccccc;
  margin-bottom: 2rem;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #404040;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 2rem 0;
  position: relative;
  color: #cccccc;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #404040;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #404040;
  background-color: #2a2a2a;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  background-color: white;
  color: #1a1a1a;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #cccccc;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <SignUpContainer>
      <Logo to="/">
        <span>🔄</span>
        SkillSync
      </Logo>
      <FormContainer>
        <Title>Create an account</Title>
        <Subtitle>Enter your information to get started with SkillSync</Subtitle>
        
        <SocialButtons>
          <SocialButton>
            <span>🔗</span>
            GitHub
          </SocialButton>
          <SocialButton>
            <span>📧</span>
            Google
          </SocialButton>
        </SocialButtons>

        <Divider>OR CONTINUE WITH</Divider>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>First name</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Last name</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Create account</SubmitButton>
        </Form>

        <LoginLink>
          Already have an account?
          <Link to="/login">Sign in</Link>
        </LoginLink>
      </FormContainer>
    </SignUpContainer>
  );
}

export default SignUp; 