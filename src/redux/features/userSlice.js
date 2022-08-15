import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile as getProfileApi } from '../../services/api';

const initialState = {
  user: '',
  usernameCheck: {
    invalid: false,
    message: '',
  },
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  const { data } = await getProfileApi('');
  const user = data.userProfile;
  return { fullName: user.fullName, username: user.username, bio: user.bio };
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsernameCheck: (state, action) => {
      state.usernameCheck = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser, setUsernameCheck } = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;
