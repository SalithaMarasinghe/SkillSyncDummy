import React from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const MessagesHeader = styled.h1`
  margin-bottom: 2rem;
  color: #ffffff;
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageItem = styled.div`
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MessageAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const MessageContent = styled.div`
  flex: 1;
`;

const MessageSender = styled.div`
  font-weight: bold;
  color: #ffffff;
`;

const MessagePreview = styled.div`
  color: #808080;
  font-size: 0.9rem;
`;

const MessageTime = styled.div`
  color: #808080;
  font-size: 0.8rem;
`;

function Messages() {
  return (
    <MessagesContainer>
      <MessagesHeader>Messages</MessagesHeader>
      <MessagesList>
        <MessageItem>
          <MessageAvatar src="/mock/avatar1.jpg" alt="User" />
          <MessageContent>
            <MessageSender>John Doe</MessageSender>
            <MessagePreview>Hey, how are you?</MessagePreview>
            <MessageTime>2 hours ago</MessageTime>
          </MessageContent>
        </MessageItem>
        <MessageItem>
          <MessageAvatar src="/mock/avatar2.jpg" alt="User" />
          <MessageContent>
            <MessageSender>Jane Smith</MessageSender>
            <MessagePreview>Thanks for the help!</MessagePreview>
            <MessageTime>5 hours ago</MessageTime>
          </MessageContent>
        </MessageItem>
      </MessagesList>
    </MessagesContainer>
  );
}

export default Messages; 