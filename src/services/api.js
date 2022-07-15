import axios from 'axios';
import axiosAuth from './axiosAuth';
import { setAccessToken, setRefreshToken } from './token';

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

export const getHomePosts = async () => {
  try {
    const ENDPOINT = 'posts/home';
    const { data } = await axiosAuth.get(`${URL_API}/${ENDPOINT}`);

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
