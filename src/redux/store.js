import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './features/commentSlice';
import userReducer from './features/userSlice';
import chatReducer from './features/chatSlice';

export default configureStore({
  reducer: {
    comment: commentReducer,
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['chat/setSocket'],
        // Ignore these paths in the state
        ignoredPaths: ['chat.socket'],
      },
    }),
});
