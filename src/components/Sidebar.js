import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2a2a2a;
  padding: 1rem;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #404040;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  color: #ffffff;
  font-weight: 500;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? '#ffffff' : '#808080'};
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #404040;
  }

  &.active {
    background-color: #404040;
  }
`;

const NavIcon = styled.span`
  font-size: 1.2rem;
`;

const LogoutButton = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #ff4444;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #404040;
  }
`;

const ToggleButton = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #404040;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, sidebarOpen } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <SidebarContainer isOpen={sidebarOpen}>
      <UserInfo>
        <UserAvatar src={user?.avatar || '/mock/avatar1.jpg'} alt="User avatar" />
        <UserName>{user?.firstName} {user?.lastName}</UserName>
      </UserInfo>

      <NavLinks>
        <NavLink to="/feed" className={location.pathname === '/feed' ? 'active' : ''}>
          <NavIcon>🏠</NavIcon>
          <span>Feed</span>
        </NavLink>
        <NavLink to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
          <NavIcon>👤</NavIcon>
          <span>Profile</span>
        </NavLink>
        <NavLink to="/friends" className={location.pathname === '/friends' ? 'active' : ''}>
          <NavIcon>👥</NavIcon>
          <span>Friends</span>
        </NavLink>
        <NavLink to="/learning" className={location.pathname === '/learning' ? 'active' : ''}>
          <NavIcon>📚</NavIcon>
          <span>Learning Plans</span>
        </NavLink>
        <NavLink to="/progress" className={location.pathname === '/progress' ? 'active' : ''}>
          <NavIcon>📊</NavIcon>
          <span>Progress</span>
        </NavLink>
      </NavLinks>

      <LogoutButton onClick={handleLogout}>
        <span>🚪</span> Logout
      </LogoutButton>

      <ToggleButton onClick={toggleSidebar}>
        {sidebarOpen ? '◀' : '▶'}
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar; 