import { createSlice } from '@reduxjs/toolkit';
import { mockFeedPosts, mockSuggestedUsers } from '../data/mockData';

const initialState = {
  user: null,
  feedPosts: [],
  suggestedUsers: [],
  loading: false,
  error: null,
  learningProgress: [],
  learningPlans: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      
      // For demo purposes, we'll use the mock user data
      if (email === 'marasinghe3u@gmail.com' && password === '1234') {
        state.user = {
          id: '1',
          firstName: 'Salitha',
          lastName: 'Marasinghe',
          email: 'marasinghe3u@gmail.com',
          avatar: 'https://via.placeholder.com/150',
          bio: 'Full-stack developer passionate about web technologies',
          posts: [],
          followers: [],
          following: [],
          stats: {
            posts: 0,
            followers: 0,
            following: 0
          },
          learningPlans: []
        };
        state.feedPosts = mockFeedPosts;
        state.suggestedUsers = mockSuggestedUsers;
        state.learningProgress = [
          {
            id: 1,
            skill: 'React',
            progress: 75,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 2,
            skill: 'JavaScript',
            progress: 85,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 3,
            skill: 'Node.js',
            progress: 60,
            lastUpdated: new Date().toISOString()
          }
        ];
        state.error = null;
      } else {
        state.error = 'Invalid email or password';
        throw new Error('Invalid email or password');
      }
    },
    logout: (state) => {
      state.user = null;
      state.feedPosts = [];
      state.suggestedUsers = [];
      state.learningProgress = [];
      state.learningPlans = [];
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    deleteUser: (state) => {
      state.user = null;
    },
    updateProfile: (state, action) => {
      const { firstName, lastName, bio, avatar, cover } = action.payload;
      state.user = {
        ...state.user,
        firstName: firstName || state.user.firstName,
        lastName: lastName || state.user.lastName,
        bio: bio || state.user.bio,
        avatar: avatar || state.user.avatar,
        cover: cover || state.user.cover
      };
    },
    addPost: (state, action) => {
      const newPost = {
        id: Date.now().toString(),
        content: action.payload.content,
        images: action.payload.images || [],
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        commentsCount: 0,
        author: {
          id: state.user.id,
          name: `${state.user.firstName} ${state.user.lastName}`,
          avatar: state.user.avatar
        }
      };
      state.user.posts.unshift(newPost);
      state.feedPosts.unshift(newPost);
      state.user.stats.posts += 1;
    },
    updatePost: (state, action) => {
      const { id, content, images } = action.payload;
      
      // Update post in user's posts
      const userPostIndex = state.user.posts.findIndex(post => post.id === id);
      if (userPostIndex !== -1) {
        state.user.posts[userPostIndex] = {
          ...state.user.posts[userPostIndex],
          content,
          images: images || []
        };
      }

      // Update post in feed posts
      const feedPostIndex = state.feedPosts.findIndex(post => post.id === id);
      if (feedPostIndex !== -1) {
        state.feedPosts[feedPostIndex] = {
          ...state.feedPosts[feedPostIndex],
          content,
          images: images || []
        };
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      console.log('Deleting post with ID:', postId);
      console.log('Current user posts:', state.user.posts);
      
      // Remove post from user's posts
      if (state.user && state.user.posts) {
        state.user.posts = state.user.posts.filter(post => {
          console.log('Comparing post ID:', post.id, 'with:', postId);
          return post.id !== postId;
        });
        console.log('Updated user posts:', state.user.posts);
        // Update post count
        state.user.stats.posts = state.user.posts.length;
      }
      
      // Remove post from feed posts
      if (state.feedPosts) {
        state.feedPosts = state.feedPosts.filter(post => post.id !== postId);
      }
    },
    toggleLike: (state, action) => {
      const postId = action.payload;
      const updatePostLikes = (posts) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
          post.likes += post.isLiked ? -1 : 1;
          post.isLiked = !post.isLiked;
        }
      };
      updatePostLikes(state.user.posts);
      updatePostLikes(state.feedPosts);
    },
    followUser: (state, action) => {
      const userId = action.payload;
      if (!state.user.following.includes(userId)) {
        state.user.following.push(userId);
        state.user.stats.following += 1;
      }
    },
    unfollowUser: (state, action) => {
      const userId = action.payload;
      state.user.following = state.user.following.filter(id => id !== userId);
      state.user.stats.following -= 1;
    },
    addLearningPlan: (state, action) => {
      const newPlan = {
        id: Date.now(),
        ...action.payload,
        progress: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      state.user.learningPlans.push(newPlan);
    },
    updateLearningPlan: (state, action) => {
      const { id, ...updates } = action.payload;
      const planIndex = state.user.learningPlans.findIndex(plan => plan.id === id);
      if (planIndex !== -1) {
        state.user.learningPlans[planIndex] = {
          ...state.user.learningPlans[planIndex],
          ...updates
        };
      }
    },
    deleteLearningPlan: (state, action) => {
      state.user.learningPlans = state.user.learningPlans.filter(
        plan => plan.id !== action.payload
      );
    },
    addLearningProgress: (state, action) => {
      const newProgress = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      state.learningProgress.push(newProgress);
    },
    updateLearningProgress: (state, action) => {
      const { id, ...updates } = action.payload;
      const progressIndex = state.learningProgress.findIndex(progress => progress.id === id);
      if (progressIndex !== -1) {
        state.learningProgress[progressIndex] = {
          ...state.learningProgress[progressIndex],
          ...updates,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
    },
    deleteLearningProgress: (state, action) => {
      state.learningProgress = state.learningProgress.filter(
        progress => progress.id !== action.payload
      );
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      
      // Update feed posts
      if (state.feedPosts) {
        const post = state.feedPosts.find(p => p.id === postId);
        if (post) {
          if (!post.comments) post.comments = [];
          post.comments.push(comment);
          post.commentsCount = (post.commentsCount || 0) + 1;
        }
      }

      // Update user's posts
      if (state.user && state.user.posts) {
        const post = state.user.posts.find(p => p.id === postId);
        if (post) {
          if (!post.comments) post.comments = [];
          post.comments.push(comment);
          post.commentsCount = (post.commentsCount || 0) + 1;
        }
      }
    },
    updateComment: (state, action) => {
      const { postId, commentId, text } = action.payload;
      
      // Update feed posts
      if (state.feedPosts) {
        const post = state.feedPosts.find(p => p.id === postId);
        if (post && post.comments) {
          const comment = post.comments.find(c => c.id === commentId);
          if (comment) {
            comment.text = text;
            comment.timestamp = new Date().toISOString();
          }
        }
      }

      // Update user's posts
      if (state.user && state.user.posts) {
        const post = state.user.posts.find(p => p.id === postId);
        if (post && post.comments) {
          const comment = post.comments.find(c => c.id === commentId);
          if (comment) {
            comment.text = text;
            comment.timestamp = new Date().toISOString();
          }
        }
      }
    },
    deleteComment: (state, action) => {
      const { postId, commentId } = action.payload;
      
      // Update feed posts
      if (state.feedPosts) {
        const post = state.feedPosts.find(p => p.id === postId);
        if (post && post.comments) {
          post.comments = post.comments.filter(c => c.id !== commentId);
          post.commentsCount = Math.max(0, (post.commentsCount || 0) - 1);
        }
      }

      // Update user's posts
      if (state.user && state.user.posts) {
        const post = state.user.posts.find(p => p.id === postId);
        if (post && post.comments) {
          post.comments = post.comments.filter(c => c.id !== commentId);
          post.commentsCount = Math.max(0, (post.commentsCount || 0) - 1);
        }
      }
    }
  }
});

export const {
  login,
  logout,
  setUser,
  clearUser,
  toggleSidebar,
  setLoading,
  setError,
  updateUser,
  deleteUser,
  updateProfile,
  addPost,
  updatePost,
  deletePost,
  toggleLike,
  followUser,
  unfollowUser,
  addLearningPlan,
  updateLearningPlan,
  deleteLearningPlan,
  addLearningProgress,
  updateLearningProgress,
  deleteLearningProgress,
  addComment,
  updateComment,
  deleteComment
} = userSlice.actions;

export default userSlice.reducer; 