import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';

const SidePanelContainer = styled.div`
  width: 250px;
  background-color: #1a1a1a;
  padding: 1rem;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid #2a2a2a;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  color: ${props => props.active ? '#ffffff' : '#808080'};
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a2a2a;
  }

  &.active {
    background-color: #2a2a2a;
  }
`;

const NavIcon = styled.span`
  font-size: 1.25rem;
`;

const NavText = styled.span`
  font-size: 0.9rem;
`;

const UserSection = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #2a2a2a;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  color: #ffffff;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const UserName = styled.div`
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  color: #808080;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #2a2a2a;
    color: #ff4444;
  }
`;

function SidePanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // If user is not logged in, don't render the side panel
  if (!user) {
    return null;
  }

  return (
    <SidePanelContainer>
      <Logo>SkillSync</Logo>
      <NavItem to="/" active={location.pathname === '/'}>
        <NavIcon>🏠</NavIcon>
        <NavText>Home</NavText>
      </NavItem>
      <NavItem to="/profile" active={location.pathname === '/profile'}>
        <NavIcon>👤</NavIcon>
        <NavText>Profile</NavText>
      </NavItem>
      <NavItem to="/learning" active={location.pathname === '/learning'}>
        <NavIcon>📚</NavIcon>
        <NavText>Learning Plans</NavText>
      </NavItem>
      <NavItem to="/progress" active={location.pathname === '/progress'}>
        <NavIcon>📈</NavIcon>
        <NavText>Learning Progress</NavText>
      </NavItem>
      <NavItem to="/friends" active={location.pathname === '/friends'}>
        <NavIcon>👥</NavIcon>
        <NavText>Friends</NavText>
      </NavItem>
      <NavItem to="/messages" active={location.pathname === '/messages'}>
        <NavIcon>💬</NavIcon>
        <NavText>Messages</NavText>
      </NavItem>
      <NavItem to="/notifications" active={location.pathname === '/notifications'}>
        <NavIcon>🔔</NavIcon>
        <NavText>Notifications</NavText>
      </NavItem>
      <NavItem to="/settings" active={location.pathname === '/settings'}>
        <NavIcon>⚙️</NavIcon>
        <NavText>Settings</NavText>
      </NavItem>
      <UserSection>
        <UserInfo>
          <UserAvatar src={user.avatar} alt={user.firstName} />
          <UserName>{user.firstName} {user.lastName}</UserName>
        </UserInfo>
        <LogoutButton onClick={handleLogout}>
          <NavIcon>🚪</NavIcon>
          <NavText>Logout</NavText>
        </LogoutButton>
      </UserSection>
    </SidePanelContainer>
  );
}

export default SidePanel; 