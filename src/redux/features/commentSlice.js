import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { getCommentsByPostId } from '../../services/api';

export const getComments = createAsyncThunk(
  '/comments/getComments',
  async (postId) => {
    const { data } = await getCommentsByPostId(postId);
    return data.comments;
  }
);

const commentEntity = createEntityAdapter({
  selectId: (comment) => comment.id,
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState: commentEntity.getInitialState({
    replyTo: { username: '', replyTo: '', parentComment: '' },
    loading: true,
  }),
  reducers: {
    setReplyTo: (state, action) => {
      state.replyTo = action.payload;
    },
  },
  extraReducers: {
    [getComments.fulfilled]: (state, action) => {
      commentEntity.setAll(state, action.payload);
      state.loading = false;
    },
  },
});

export const commentSelector = commentEntity.getSelectors(
  (state) => state.comment
);

export const { setReplyTo } = commentSlice.actions;

export const replyToSelector = (state) => state.comment.replyTo;
export const loadingSelector = (state) => state.comment.loading;

export default commentSlice.reducer;
