import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import ChatBar from '../components/ChatBar';
import ChatForm from '../components/ChatForm';
import ChatItem from '../components/ChatItem';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { getLocalUser } from '../services/token';

const socket = io(process.env.REACT_APP_API_URL);

const Chat = () => {
  const { userId: to } = useParams();
  const { id: from } = getLocalUser();

  socket.on('connect', () => {
    socket.emit('join-chat', from);
  });

  const [chats, setChats] = useState([{ position: 'left', text: 'p' }]);

  const handleSend = (chat) => {
    console.log(chat);
    setChats(chats.concat({ position: 'right', text: chat }));
    socket.emit('send-chat', { chat, from, to });
  };

  socket.on('receive-chat', ({ chat, from }) => {
    if (from === to) {
      setChats(chats.concat({ position: 'left', text: chat }));
    }
  });

  return (
    <>
      <ChatBar />
      <Box id="chat-list" sx={{ padding: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            color="white"
            sx={{
              backgroundColor: grey[600],
              display: 'inline',
              fontSize: 12,
              padding: 1,
              borderRadius: 5,
            }}
          >
            Yesterday
          </Typography>
        </Box>
        {chats.map((c, i) => (
          <ChatItem position={c.position} text={c.text} key={i} />
        ))}
      </Box>
      <ChatForm handleSend={handleSend} />
    </>
  );
};

export default Chat;
