import React from 'react';
import styled from 'styled-components';

const NotificationsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const NotificationsHeader = styled.h1`
  margin-bottom: 2rem;
  color: #ffffff;
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled.div`
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  color: #ffffff;
`;

const NotificationMessage = styled.div`
  color: #808080;
  font-size: 0.9rem;
`;

const NotificationTime = styled.div`
  color: #808080;
  font-size: 0.8rem;
`;

function Notifications() {
  return (
    <NotificationsContainer>
      <NotificationsHeader>Notifications</NotificationsHeader>
      <NotificationsList>
        <NotificationItem>
          <NotificationIcon>👥</NotificationIcon>
          <NotificationContent>
            <NotificationTitle>New Connection</NotificationTitle>
            <NotificationMessage>John Doe started following you</NotificationMessage>
            <NotificationTime>2 hours ago</NotificationTime>
          </NotificationContent>
        </NotificationItem>
        <NotificationItem>
          <NotificationIcon>💬</NotificationIcon>
          <NotificationContent>
            <NotificationTitle>New Comment</NotificationTitle>
            <NotificationMessage>Jane Smith commented on your post</NotificationMessage>
            <NotificationTime>5 hours ago</NotificationTime>
          </NotificationContent>
        </NotificationItem>
        <NotificationItem>
          <NotificationIcon>👍</NotificationIcon>
          <NotificationContent>
            <NotificationTitle>New Like</NotificationTitle>
            <NotificationMessage>Mike Johnson liked your post</NotificationMessage>
            <NotificationTime>1 day ago</NotificationTime>
          </NotificationContent>
        </NotificationItem>
      </NotificationsList>
    </NotificationsContainer>
  );
}

export default Notifications; 