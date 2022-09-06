import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendChat as sendChatSocket } from '../../services/socket';
import { getConversation as getConversationApi } from '../../services/api';

const initialState = {
  socket: null,
  chats: [],
  loading: true,
};

export const getChats = createAsyncThunk(
  'chat/getChats',
  async (foreignUserId) => {
    const { data } = await getConversationApi(foreignUserId);
    const chats = data.chats.map((chat) => ({
      ...chat,
      side: chat.from !== foreignUserId ? 'right' : 'left',
    }));

    return chats;
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    sendChat: (state, { payload: { chat, from, to, fromUsername } }) => {
      const time = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const date = 'Today';

      state.chats = state.chats.concat({
        side: 'right',
        chat,
        time,
        date,
      });

      sendChatSocket(state.socket, {
        chat,
        date,
        time,
        from,
        to,
        fromUsername,
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.loading = false;
    });
  },
});

export const { setSocket, receiveChat, sendChat, setChats } = chatSlice.actions;

export const socketSelector = (state) => state.chat;

export default chatSlice.reducer;
