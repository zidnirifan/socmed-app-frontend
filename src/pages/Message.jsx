import React, { useCallback, useEffect, useState } from 'react';
import MessageList from '../components/MessageList';
import MessageBar from '../components/MessageBar';
import {
  getFollowing,
  getLatestChats as getLatestChatsApi,
  getSuggestedUsers,
} from '../services/api';
import { getLocalUser } from '../services/token';
import { receiveChat } from '../services/socket';
import { useSelector } from 'react-redux';
import { socketSelector } from '../redux/features/chatSlice';
import ContactList from '../components/ContactList';
import { Box, Typography } from '@mui/material';
import SkeletonList from '../components/skeleton/SkeletonList';
import SpeakerNotesOffOutlinedIcon from '@mui/icons-material/SpeakerNotesOffOutlined';

export default function Message() {
  const { id: userId } = getLocalUser();

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  const { socket } = useSelector(socketSelector);

  if (socket) {
    receiveChat(socket, async (chat) => {
      const pathUrl = window.location.pathname;
      if (pathUrl === '/message') {
        const chatsUpdated = chats.map((c) => {
          if (c.id === chat.from)
            return {
              ...c,
              chat: chat.chat,
              createdAt: chat.date === 'Today' ? chat.time : chat.date,
              isRead: false,
            };
          return c;
        });

        chatsUpdated.sort((x, y) =>
          x.id === chat.from ? -1 : y.id === chat.from ? 1 : 0
        );

        setChats(chatsUpdated);
      }
    });
  }

  const getLatestChats = useCallback(async () => {
    const chats = await getLatestChatsApi();
    const chatsMapped = chats.data.chats.map((chat) => ({
      chat: chat.chat,
      id: chat.from.id !== userId ? chat.from.id : chat.to.id,
      fullName: chat.from.id !== userId ? chat.from.fullName : chat.to.fullName,
      profilePhoto:
        chat.from.id !== userId ? chat.from.profilePhoto : chat.to.profilePhoto,
      createdAt: chat.date === 'Today' ? chat.time : chat.date,
      isRead: chat.from.id !== userId ? chat.isRead : true,
    }));

    const suggested = await getSuggestedUsers();
    const following = await getFollowing(userId);

    setLoading(false);
    setChats(chatsMapped);
    setSuggestedUsers(suggested.data.users);
    setFollowingUsers(following.data.users);
  }, [userId]);

  useEffect(() => {
    getLatestChats();
  }, [getLatestChats]);

  return (
    <>
      <MessageBar />
      {loading ? (
        <SkeletonList amount={10} />
      ) : (
        <>
          {chats.length === 0 ? (
            <Box sx={{ textAlign: 'center', marginTop: 3, marginBottom: 2 }}>
              <SpeakerNotesOffOutlinedIcon sx={{ width: 50, height: 50 }} />
              <Typography variant="h6">No message yet</Typography>
            </Box>
          ) : (
            <MessageList chatData={chats} />
          )}

          {followingUsers.length !== 0 && (
            <>
              <Typography
                variant="body1"
                sx={{
                  marginTop: 3,
                  paddingLeft: 2,
                  fontWeight: 500,
                }}
              >
                Following
              </Typography>
              <ContactList users={followingUsers} />
            </>
          )}

          <Typography
            variant="body1"
            sx={{
              marginTop: 1,
              paddingLeft: 2,
              fontWeight: 500,
            }}
          >
            Suggested for you
          </Typography>
          <ContactList users={suggestedUsers} />
        </>
      )}
    </>
  );
}
