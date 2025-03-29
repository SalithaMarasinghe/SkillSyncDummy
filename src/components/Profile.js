import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost } from '../features/userSlice';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  margin-left: 250px;
  width: calc(100% - 250px);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;

  &:hover {
    opacity: 0.9;
  }
`;

const ProfileHeader = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const CoverPhoto = styled.div`
  height: 200px;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #1a1a1a;
  margin-top: -75px;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const Bio = styled.p`
  color: #808080;
  margin: 0.5rem 0;
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StatLabel = styled.div`
  color: #808080;
  font-size: 0.9rem;
`;

const PostsSection = styled.div`
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Post = styled.div`
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 4px;
`;

const PostContent = styled.p`
  margin: 0 0 1rem 0;
`;

const PostImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #808080;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #808080;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #ffffff;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #404040;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editImages, setEditImages] = useState([]);

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditContent(post.content);
    setEditImages(post.images || []);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editContent.trim()) {
      dispatch(updatePost({
        id: editingPost.id,
        content: editContent.trim(),
        images: editImages
      }));
      setEditingPost(null);
      setEditContent('');
      setEditImages([]);
    }
  };

  const handleDelete = (postId) => {
    console.log('Attempting to delete post:', postId);
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        // Ensure postId is a string
        const stringPostId = String(postId);
        console.log('Dispatching deletePost with ID:', stringPostId);
        dispatch(deletePost(stringPostId));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <CoverPhoto style={{ backgroundImage: `url(${user.cover})` }} />
        <ProfileInfo>
          <Avatar src={user.avatar} alt={user.firstName} />
          <Info>
            <Name>{user.firstName} {user.lastName}</Name>
            <Bio>{user.bio}</Bio>
            <Stats>
              <Stat>
                <StatValue>{user.stats.posts}</StatValue>
                <StatLabel>Posts</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{user.stats.followers}</StatValue>
                <StatLabel>Followers</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{user.stats.following}</StatValue>
                <StatLabel>Following</StatLabel>
              </Stat>
            </Stats>
          </Info>
        </ProfileInfo>
      </ProfileHeader>

      <PostsSection>
        <SectionTitle>Posts</SectionTitle>
        <PostsList>
          {Array.isArray(user.posts) && user.posts.length > 0 ? (
            user.posts.map(post => (
              <Post key={post.id}>
                <PostContent>{post.content}</PostContent>
                {Array.isArray(post.images) && post.images.length > 0 && (
                  <PostImages>
                    {post.images.map((image, index) => (
                      <PostImage key={index} src={image} alt={`Post image ${index + 1}`} />
                    ))}
                  </PostImages>
                )}
                <PostActions>
                  <div>{post.likes} likes</div>
                  <ActionButtons>
                    <ActionButton onClick={() => handleEdit(post)}>
                      Edit
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(post.id)}>
                      Delete
                    </ActionButton>
                  </ActionButtons>
                </PostActions>
              </Post>
            ))
          ) : (
            <Post>
              <PostContent>No posts yet. Create your first post!</PostContent>
            </Post>
          )}
        </PostsList>
      </PostsSection>

      {editingPost && (
        <Modal>
          <ModalContent>
            <h2>Edit Post</h2>
            <Form onSubmit={handleUpdate}>
              <TextArea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="What's on your mind?"
              />
              <ButtonGroup>
                <Button type="submit">Save Changes</Button>
                <Button type="button" onClick={() => setEditingPost(null)}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </ProfileContainer>
  );
}

export default Profile; 