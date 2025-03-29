export const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Software Developer | Learning Enthusiast',
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

export const mockFeedPosts = [
  {
    id: '1',
    content: 'Just started learning React!',
    images: [],
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: [],
    commentsCount: 0,
    author: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/150'
    }
  }
];

export const mockSuggestedUsers = [
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'UI/UX Designer',
    stats: {
      posts: 5,
      followers: 120,
      following: 45
    }
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Full Stack Developer',
    stats: {
      posts: 8,
      followers: 200,
      following: 60
    }
  }
]; 