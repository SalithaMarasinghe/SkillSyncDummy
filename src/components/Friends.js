import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const FriendsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #ffffff;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #808080;
  font-size: 1.1rem;
`;

const FriendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FriendCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FriendAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const FriendName = styled.h2`
  color: #ffffff;
  margin: 0;
  font-size: 1.2rem;
`;

const FriendBio = styled.p`
  color: #808080;
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
`;

const FriendStats = styled.div`
  display: flex;
  gap: 1rem;
  color: #808080;
  font-size: 0.9rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.span`
  color: #ffffff;
  font-weight: 500;
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;

function Friends() {
  const { suggestedUsers } = useSelector(state => state.user);

  // Add default stats if they don't exist
  const getDefaultStats = () => ({
    posts: 0,
    followers: 0,
    following: 0
  });

  return (
    <FriendsContainer>
      <Header>
        <Title>Friends</Title>
        <Subtitle>Connect with other learners</Subtitle>
      </Header>
      <FriendsGrid>
        {suggestedUsers?.map(user => {
          const stats = user.stats || getDefaultStats();
          return (
            <FriendCard key={user.id}>
              <FriendAvatar 
                src={user.avatar || 'https://via.placeholder.com/80'} 
                alt={user.firstName || 'User'} 
              />
              <FriendName>
                {user.firstName || 'User'} {user.lastName || ''}
              </FriendName>
              <FriendBio>{user.bio || 'No bio available'}</FriendBio>
              <FriendStats>
                <StatItem>
                  <StatValue>{stats.posts}</StatValue>
                  <StatLabel>Posts</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{stats.followers}</StatValue>
                  <StatLabel>Followers</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{stats.following}</StatValue>
                  <StatLabel>Following</StatLabel>
                </StatItem>
              </FriendStats>
              <ActionButton>Follow</ActionButton>
            </FriendCard>
          );
        })}
      </FriendsGrid>
    </FriendsContainer>
  );
}

export default Friends; 