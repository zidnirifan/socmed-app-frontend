import axios from 'axios';
import axiosAuth from './axiosAuth';
import {
  getRefreshToken,
  logoutLocal,
  setAccessToken,
  setLocalUser,
  setRefreshToken,
} from './token';

const URL_API = process.env.REACT_APP_API_URL;

export const registerUser = async ({ username, fullName, password }) => {
  try {
    const ENDPOINT = 'users';

    const { data } = await axios({
      method: 'post',
      url: `${URL_API}/${ENDPOINT}`,
      data: {
        username,
        fullName,
        password,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const ENDPOINT = 'auth';

    const { data } = await axios({
      method: 'post',
      url: `${URL_API}/${ENDPOINT}`,
      data: {
        username,
        password,
      },
    });

    setAccessToken(data.data.accessToken);
    setRefreshToken(data.data.refreshToken);

    const {
      data: { user },
    } = await getUserById();

    setLocalUser({
      id: user.id,
      username: user.username,
      profilePhoto: user.profilePhoto,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const changeProfilePhoto = async (photo) => {
  try {
    const ENDPOINT = 'users/photo';

    const { data } = await axiosAuth({
      method: 'put',
      url: `${URL_API}/${ENDPOINT}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        photo,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const editUser = async ({ username, fullName, bio }) => {
  try {
    const ENDPOINT = 'users';

    const { data } = await axiosAuth({
      method: 'put',
      url: `${URL_API}/${ENDPOINT}`,
      data: {
        username,
        fullName,
        bio,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFollowingPosts = async () => {
  try {
    const ENDPOINT = 'posts/following';
    const { data } = await axiosAuth.get(`${URL_API}/${ENDPOINT}`);

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getSuggestedPosts = async (exceptPosts) => {
  try {
    const ENDPOINT = 'posts/explore';

    const { data } = await axiosAuth({
      method: 'post',
      url: `${URL_API}/${ENDPOINT}`,
      data: {
        exceptPosts,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const likePost = async (postId) => {
  try {
    const ENDPOINT = `posts/${postId}/like`;
    const { data } = await axiosAuth({
      method: 'put',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProfile = async (userId) => {
  try {
    const ENDPOINT = `users/profile/${userId}`;
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const followUser = async (userId) => {
  try {
    const ENDPOINT = `users/${userId}/follow`;
    const { data } = await axiosAuth({
      method: 'put',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPostById = async (postId) => {
  try {
    const ENDPOINT = `posts/id/${postId}`;
    const { data } = await axiosAuth.get(`${URL_API}/${ENDPOINT}`);

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const addPost = async ({ media, caption }) => {
  try {
    const ENDPOINT = 'posts';

    const formData = new FormData();

    for (const i of media) {
      formData.append('media', i);
    }

    formData.append('caption', caption);

    const { data } = await axiosAuth({
      method: 'post',
      url: `${URL_API}/${ENDPOINT}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getExplorePostsMedia = async (exceptPosts) => {
  try {
    const ENDPOINT = 'posts/explore/media';

    const { data } = await axiosAuth({
      method: 'post',
      url: `${URL_API}/${ENDPOINT}`,
      data: {
        exceptPosts,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const searchUsers = async (text) => {
  try {
    const ENDPOINT = `users/search?text=${text}`;
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const ENDPOINT = `posts/${postId}/comments`;
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const likeComment = async (postId, commentId) => {
  try {
    const ENDPOINT = `posts/${postId}/comments/${commentId}/like`;
    const { data } = await axiosAuth({
      method: 'put',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const addComment = async (postId, { content }) => {
  try {
    const ENDPOINT = `posts/${postId}/comments`;
    const { data } = await axiosAuth({
      method: 'post',
      url: `${URL_API}/${ENDPOINT}`,
      data: { content },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const addReply = async (postId, { content, replyTo, parentComment }) => {
  try {
    const ENDPOINT = `posts/${postId}/comments`;
    const { data } = await axiosAuth({
      method: 'post',
      url: `${URL_API}/${ENDPOINT}`,
      data: { content, replyTo, parentComment },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const logoutApi = async () => {
  try {
    const refreshToken = getRefreshToken();

    const ENDPOINT = 'auth';
    const { data } = await axiosAuth({
      method: 'delete',
      url: `${URL_API}/${ENDPOINT}`,
      data: { refreshToken },
    });

    logoutLocal();

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getLatestChats = async () => {
  try {
    const ENDPOINT = 'chats/latest';
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getConversation = async (userId) => {
  try {
    const ENDPOINT = `chats/conversation/${userId}`;
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const readChat = async (userId) => {
  try {
    const ENDPOINT = `chats/conversation/${userId}/read`;
    const { data } = await axiosAuth({
      method: 'put',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCountNotifChat = async () => {
  try {
    const ENDPOINT = 'notifications/count';
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getNotifications = async () => {
  try {
    const ENDPOINT = 'notifications';
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const readNotifications = async () => {
  try {
    const ENDPOINT = 'notifications/read';
    const { data } = await axiosAuth({
      method: 'put',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFollowers = async (id) => {
  try {
    const ENDPOINT = `users/${id}/followers`;
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFollowing = async (id) => {
  try {
    const ENDPOINT = `users/${id}/following`;
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getSuggestedUsers = async () => {
  try {
    const ENDPOINT = 'users/suggested';
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserById = async (id = '') => {
  try {
    const ENDPOINT = `users/${id}`;
    const { data } = await axiosAuth({
      method: 'get',
      url: `${URL_API}/${ENDPOINT}`,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const editUserBio = async (bio) => {
  try {
    const ENDPOINT = 'users/bio';

    const { data } = await axiosAuth({
      method: 'put',
      url: `${URL_API}/${ENDPOINT}`,
      data: {
        bio,
      },
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};
