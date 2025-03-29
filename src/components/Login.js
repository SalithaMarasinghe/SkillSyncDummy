import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../features/userSlice';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  color: #ffffff;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
  font-size: 1.2rem;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const FormCard = styled.div`
  background-color: rgba(26, 26, 26, 0.8);
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const Subtitle = styled.p`
  color: #808080;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const SocialButtons = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  background-color: transparent;
  color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2a2a2a;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #808080;
  font-size: 0.9rem;
  margin: 2rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #2a2a2a;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: #2a2a2a;
  border: 1px solid #404040;
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }

  &::placeholder {
    color: #808080;
  }
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #808080;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const ForgotPassword = styled(Link)`
  color: #808080;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Footer = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #808080;
  font-size: 0.9rem;

  a {
    color: #ffffff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({
        email: formData.email,
        password: formData.password
      })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginContainer>
      <Header>
        <HeaderContent>
          <Logo to="/">
            <LogoIcon>🔄</LogoIcon>
            SkillSync
          </Logo>
        </HeaderContent>
      </Header>

      <FormContainer>
        <FormCard>
          <Title>Log in to SkillSync</Title>
          <Subtitle>Enter your credentials to access your account</Subtitle>

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
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <RememberForgot>
              <RememberMe>
                <Checkbox
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </RememberMe>
              <ForgotPassword to="/forgot-password">
                Forgot password?
              </ForgotPassword>
            </RememberForgot>
            <LoginButton type="submit">Log in</LoginButton>
          </Form>

          <Footer>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Footer>
        </FormCard>
      </FormContainer>
    </LoginContainer>
  );
}

export default Login; 