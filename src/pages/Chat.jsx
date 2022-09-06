import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useRef } from 'react';
import ChatBar from '../components/ChatBar';
import ChatForm from '../components/ChatForm';
import ChatItem from '../components/ChatItem';
import { useParams } from 'react-router-dom';
import { getLocalUser } from '../services/token';
import { useSelector, useDispatch } from 'react-redux';
import {
  getChats,
  socketSelector,
  setChats,
} from '../redux/features/chatSlice';
import { receiveChat } from '../services/socket';
import { readChat } from '../services/api';
import SkeletonChat from '../components/skeleton/SkeletonChat';

const Chat = () => {
  const bottomRef = useRef();
  const dispatch = useDispatch();

  const { userId: foreignUserId } = useParams();
  const { id: ownUserId } = getLocalUser();

  const { socket, chats, loading } = useSelector(socketSelector);

  if (socket) {
    receiveChat(socket, async (chat) => {
      const pathUrl = window.location.pathname;
      if (pathUrl === `/message/${chat.from}/chat`) {
        await dispatch(setChats(chats.concat({ side: 'left', ...chat })));
        bottomRef.current.scrollIntoView();
        readChat(foreignUserId);
      }
    });
  }

  useEffect(() => {
    async function fetchData() {
      await dispatch(getChats(foreignUserId));
      bottomRef.current.scrollIntoView();
      readChat(foreignUserId);
    }
    fetchData();
  }, [dispatch, ownUserId, foreignUserId]);

  let date = '';

  return (
    <>
      <ChatBar />
      {loading ? (
        <SkeletonChat amount={10} />
      ) : (
        <>
          <Box id="chat-list" sx={{ padding: 2 }}>
            {chats.map((c, i) => {
              const isDifferentDate = c.date !== date;
              date = c.date;

              return (
                <Box key={i}>
                  {isDifferentDate && (
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
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
        </>
      )}
      <ChatForm bottomRef={bottomRef} />
    </>
  );
};

export default Chat;
