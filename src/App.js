import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SidePanel from './components/SidePanel';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import Messages from './components/Messages';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Friends from './components/Friends';
import LearningPlans from './components/LearningPlans';
import LearningProgress from './components/LearningProgress';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

function App() {
  const { user } = useSelector(state => state.user);

  return (
    <Router>
      <AppContainer>
        {user && <SidePanel />}
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/messages" element={user ? <Messages /> : <Navigate to="/login" />} />
            <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/friends" element={user ? <Friends /> : <Navigate to="/login" />} />
            <Route path="/learning" element={user ? <LearningPlans /> : <Navigate to="/login" />} />
            <Route path="/progress" element={user ? <LearningProgress /> : <Navigate to="/login" />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App; 