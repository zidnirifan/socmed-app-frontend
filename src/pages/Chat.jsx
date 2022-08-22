import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import ChatBar from '../components/ChatBar';
import ChatForm from '../components/ChatForm';
import ChatItem from '../components/ChatItem';

const Chat = () => (
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
      <ChatItem position="left" text="p" />
      <ChatItem position="left" text="p" />
      <ChatItem position="right" text="woy opo jwohfow wofhiowe" />
      <ChatItem
        position="left"
        text="woehofoe wehfwheohfweo fewibfivdf ewfifgowef weofhewofweb"
      />
      <ChatItem
        position="right"
        text="woehofoe wehfwheohfwe fewibf ewfifgowef weofhewofweb"
      />
    </Box>
    <ChatForm />
  </>
);

export default Chat;
