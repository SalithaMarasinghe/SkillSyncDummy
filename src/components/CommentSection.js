import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, updateComment, deleteComment } from '../features/userSlice';

const CommentSectionContainer = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #2a2a2a;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #2a2a2a;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const CommentButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #ffffff;
  color: #1a1a1a;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Comment = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  background-color: #1a1a1a;
  border-radius: 4px;
`;

const CommentAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const CommentText = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
`;

const CommentDate = styled.div`
  color: #808080;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const CommentAction = styled.button`
  background: none;
  border: none;
  color: #808080;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

const EditForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const EditInput = styled(CommentInput)`
  margin: 0;
`;

function CommentSection({ postId }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');

  // Get post from either user's posts or feed posts
  const post = useSelector(state => 
    state.user.feedPosts.find(p => p.id === postId) || 
    state.user.user?.posts.find(p => p.id === postId)
  );

  const comments = post?.comments || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      userAvatar: user.avatar,
      text: newComment.trim(),
      timestamp: new Date().toISOString()
    };

    dispatch(addComment({ postId, comment }));
    setNewComment('');
  };

  const handleEdit = (comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.text);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    dispatch(updateComment({
      postId,
      commentId: editingComment,
      text: editContent.trim()
    }));

    setEditingComment(null);
    setEditContent('');
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment({ postId, commentId }));
    }
  };

  return (
    <CommentSectionContainer>
      <CommentForm onSubmit={handleSubmit}>
        <CommentInput
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <CommentButton type="submit">Post</CommentButton>
      </CommentForm>

      <CommentsList>
        {comments.length === 0 ? (
          <Comment>
            <CommentContent>
              <CommentText>No comments yet. Be the first to comment!</CommentText>
            </CommentContent>
          </Comment>
        ) : (
          comments.map(comment => (
            <Comment key={comment.id}>
              <CommentAvatar 
                src={comment.userAvatar || 'https://via.placeholder.com/32'} 
                alt={comment.userName} 
              />
              <CommentContent>
                <CommentAuthor>{comment.userName}</CommentAuthor>
                {editingComment === comment.id ? (
                  <EditForm onSubmit={handleUpdate}>
                    <EditInput
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <CommentButton type="submit">Save</CommentButton>
                    <CommentAction type="button" onClick={() => setEditingComment(null)}>
                      Cancel
                    </CommentAction>
                  </EditForm>
                ) : (
                  <>
                    <CommentText>{comment.text}</CommentText>
                    <CommentDate>
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </CommentDate>
                    {comment.userId === user.id && (
                      <CommentActions>
                        <CommentAction onClick={() => handleEdit(comment)}>
                          Edit
                        </CommentAction>
                        <CommentAction onClick={() => handleDelete(comment.id)}>
                          Delete
                        </CommentAction>
                      </CommentActions>
                    )}
                  </>
                )}
              </CommentContent>
            </Comment>
          ))
        )}
      </CommentsList>
    </CommentSectionContainer>
  );
}

export default CommentSection; 