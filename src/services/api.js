import axios from 'axios';

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

    return data;
  } catch (error) {
    return error.response.data;
  }
};
