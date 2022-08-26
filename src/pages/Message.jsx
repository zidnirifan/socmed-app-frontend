import React, { useCallback, useEffect, useState } from 'react';
import MessageList from '../components/MessageList';
import MessageBar from '../components/MessageBar';
import { getLatestChats as getLatestChatsApi } from '../services/api';
import { getLocalUser } from '../services/token';

export default function Message() {
  const { id: userId } = getLocalUser();

  const [chats, setChats] = useState([]);

  const getLatestChats = useCallback(async () => {
    const chats = await getLatestChatsApi();

    const chatsMapped = chats.data.chats.map((chat) => ({
      chat: chat.chat,
      id: chat.from.id !== userId ? chat.from.id : chat.to.id,
      fullName: chat.from.id !== userId ? chat.from.fullName : chat.to.fullName,
      profilePhoto:
        chat.from.id !== userId ? chat.from.profilePhoto : chat.to.profilePhoto,
      createdAt: new Date(chat.createdAt).toDateString(),
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
