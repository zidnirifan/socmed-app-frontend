import React, { useCallback, useEffect, useState } from 'react';
import MessageList from '../components/MessageList';
import MessageBar from '../components/MessageBar';
import { getLatestChats as getLatestChatsApi } from '../services/api';
import { getLocalUser } from '../services/token';
import { receiveChat } from '../services/socket';
import { useSelector } from 'react-redux';
import { socketSelector } from '../redux/features/chatSlice';

export default function Message() {
  const { id: userId } = getLocalUser();

  const [chats, setChats] = useState([]);

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

    setChats(chatsMapped);
  }, [userId]);

  useEffect(() => {
    getLatestChats();
  }, [getLatestChats]);

  return (
    <>
      <MessageBar />
      <MessageList chatData={chats} />
    </>
  );
}
