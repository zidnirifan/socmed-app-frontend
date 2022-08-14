import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './features/commentSlice';
import userReducer from './features/userSlice';

export default configureStore({
  reducer: {
    comment: commentReducer,
    user: userReducer,
  },
});
