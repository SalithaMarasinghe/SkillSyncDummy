import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost, updatePost, deletePost, toggleLike } from '../features/userSlice';
import CommentSection from './CommentSection';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const CreatePost = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
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

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageUploadButton = styled.button`
  background: none;
  border: 1px solid #404040;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #404040;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PostButton = styled.button`
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PostCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #404040;
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const PostAuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const PostTime = styled.div`
  color: #cccccc;
  font-size: 0.9rem;
`;

const PostContent = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const PostImages = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
  grid-template-columns: ${props => 
    props.count === 1 ? '1fr' : 
    props.count === 2 ? '1fr 1fr' : 
    '1fr 1fr 1fr'};
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 2rem;
  color: #cccccc;
  font-size: 0.9rem;
  padding-top: 1rem;
  border-top: 1px solid #404040;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #cccccc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    background-color: #404040;
  }
`;

const PostHeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

const HeaderActionButton = styled.button`
  background: none;
  border: none;
  color: #cccccc;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;

  &:hover {
    background-color: #404040;
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
`;

const ModalContent = styled.div`
  background-color: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
`;

const Button = styled.button`
  background: none;
  border: 1px solid #404040;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #404040;
  }
`;

function Feed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, feedPosts } = useSelector(state => state.user);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert('You can only upload up to 3 images');
      return;
    }

    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));

    setImages([...images, ...newImages]);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setImages(newImages);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && images.length === 0) return;

    const imageUrls = images.map(img => img.url);

    if (editingPost) {
      dispatch(updatePost({
        id: editingPost.id,
        content,
        images: imageUrls
      }));
      setEditingPost(null);
    } else {
      dispatch(addPost({
        content,
        images: imageUrls
      }));
    }

    setContent('');
    setImages([]);
    setSelectedFiles([]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setContent('');
    setImages([]);
    setSelectedFiles([]);
    setEditingPost(null);
    setIsModalOpen(false);
  };

  const handleLike = (postId, isFeedPost) => {
    dispatch(toggleLike({ postId, isFeedPost }));
  };

  const handleEdit = (post) => {
    setContent(post.content);
    setImages(post.images.map(img => ({
      url: img,
      file: null
    })));
    setSelectedFiles(post.images.map(img => ({
      url: img,
      file: null
    })));
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  // Combine user's posts and feed posts, sort by timestamp
  const allPosts = [...(user?.posts || []), ...(feedPosts || [])]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const renderPostForm = () => (
    <Form onSubmit={handleSubmit}>
      <TextArea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {images.length > 0 && (
        <ImagePreviewContainer>
          {images.map((image, index) => (
            <ImagePreview key={index}>
              <img src={image.url} alt={`Preview ${index + 1}`} />
              <RemoveImageButton onClick={() => handleRemoveImage(index)}>
                ×
              </RemoveImageButton>
            </ImagePreview>
          ))}
        </ImagePreviewContainer>
      )}
      <ButtonGroup>
        <ImageUploadButton
          as="label"
          disabled={images.length >= 3}
        >
          📷 Add Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            disabled={images.length >= 3}
          />
        </ImageUploadButton>
        <div>
          {isModalOpen && (
            <Button onClick={handleCancel} style={{ marginRight: '1rem' }}>
              Cancel
            </Button>
          )}
          <PostButton type="submit" disabled={!content.trim() && images.length === 0}>
            {editingPost ? 'Save Changes' : 'Post'}
          </PostButton>
        </div>
      </ButtonGroup>
    </Form>
  );

  if (!user) {
    return null;
  }

  return (
    <Container>
      <CreatePost>
        {renderPostForm()}
      </CreatePost>

      <PostList>
        {allPosts.map(post => post && (
          <PostCard key={post.id}>
            <PostHeader>
              <Avatar src={post.author?.avatar || '/default-avatar.png'} />
              <PostAuthorInfo>
                <AuthorName>{post.author?.name || 'Anonymous'}</AuthorName>
                <PostTime>{post.timestamp || 'Just now'}</PostTime>
              </PostAuthorInfo>
              {post.author?.id === user.id && (
                <PostHeaderActions>
                  <HeaderActionButton onClick={() => handleEdit(post)}>✏️</HeaderActionButton>
                  <HeaderActionButton onClick={() => handleDelete(post.id)}>🗑️</HeaderActionButton>
                </PostHeaderActions>
              )}
            </PostHeader>
            <PostContent>{post.content}</PostContent>
            {post.images && post.images.length > 0 && (
              <PostImages count={post.images.length}>
                {post.images.map((image, index) => (
                  <PostImage 
                    key={index} 
                    src={image} 
                    alt={`Post image ${index + 1}`}
                    onError={(e) => {
                      e.target.src = '/default-image.jpg';
                      e.target.onerror = null;
                    }}
                  />
                ))}
              </PostImages>
            )}
            <PostActions>
              <ActionButton onClick={() => handleLike(post.id, post.author?.id !== user.id)}>
                <span>❤️</span> {post.likes || 0}
              </ActionButton>
              <ActionButton>
                <span>💬</span> {post.comments || 0}
              </ActionButton>
              <ActionButton>
                <span>↗️</span> Share
              </ActionButton>
            </PostActions>
            <CommentSection postId={post.id} />
          </PostCard>
        ))}
        {allPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#cccccc' }}>
            No posts yet. Be the first to share something!
          </div>
        )}
      </PostList>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            {renderPostForm()}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default Feed; 