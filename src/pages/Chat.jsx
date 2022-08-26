import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatBar from '../components/ChatBar';
import ChatForm from '../components/ChatForm';
import ChatItem from '../components/ChatItem';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { getLocalUser } from '../services/token';
import { getConversation as getConversationApi } from '../services/api';

const socket = io(process.env.REACT_APP_API_URL);

const Chat = () => {
  const bottomRef = useRef();

  const { userId: to } = useParams();
  const { id: from } = getLocalUser();

  socket.on('connect', () => {
    socket.emit('join-chat', from);
  });

  const [chats, setChats] = useState([
    { side: 'left', chat: '', time: '', date: '' },
  ]);

  const handleSend = (chat) => {
    const time = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const date = 'Today';

    setChats(
      chats.concat({
        side: 'right',
        chat,
        time,
        date,
      })
    );
    socket.emit('send-chat', { chat, date, time, from, to });
    bottomRef.current.scrollIntoView();
  };

  socket.on('receive-chat', ({ chat, from, time, date }) => {
    if (from === to) {
      setChats(chats.concat({ side: 'left', chat, time, date }));
    }
  });

  const getConversation = useCallback(async () => {
    const chats = await getConversationApi(to);

    const chatsMapped = chats.data.chats.map((chat) => ({
      ...chat,
      side: chat.from !== to ? 'right' : 'left',
    }));

    setChats(chatsMapped);
    bottomRef.current.scrollIntoView();
  }, [to]);

  useEffect(() => {
    getConversation();
  }, [getConversation]);

  let date = '';

  return (
    <>
      <ChatBar />
      <Box id="chat-list" sx={{ padding: 2 }}>
        {chats.map((c, i) => {
          const isDifferentDate = c.date !== date;
          date = c.date;

          return (
            <Box key={i}>
              {isDifferentDate && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    color="white"
                    sx={{
                      backgroundColor: grey[600],
                      display: 'inline',
                      fontSize: 12,
                      paddingY: 0.7,
                      paddingX: 2,
                      borderRadius: 3,
                    }}
                  >
                    {c.date}
                  </Typography>
                </Box>
              )}

              <ChatItem side={c.side} chat={c.chat} time={c.time} key={i} />
            </Box>
          );
        })}
      </Box>
      <Box height="50px" ref={bottomRef} />
      <ChatForm handleSend={handleSend} />
    </>
  );
};

export default Chat;
