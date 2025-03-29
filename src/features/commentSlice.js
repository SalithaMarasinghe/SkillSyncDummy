import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: []
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      const { id, content } = action.payload;
      const comment = state.comments.find(c => c.id === id);
      if (comment) {
        comment.content = content;
      }
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    }
  }
});

export const { addComment, updateComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer; 