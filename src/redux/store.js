import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './features/commentSlice';

export default configureStore({
  reducer: {
    comment: commentReducer,
  },
});
