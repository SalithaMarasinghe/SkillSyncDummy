import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import postReducer from './features/postSlice';
import commentReducer from './features/commentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    comments: commentReducer
  },
  devTools: true
}); 