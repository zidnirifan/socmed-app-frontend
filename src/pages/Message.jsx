import React from 'react';
import MessageList from '../components/MessageList';
import MessageBar from '../components/MessageBar';

const chatData = [
  {
    id: '62c8228a9bf4e43bb177eb8d',
    fullName: 'Gedang',
    avatar: '',
    lastChat: "I'll be in your neighborhood doing errands this…",
    time: 'Saturday',
  },
  {
    id: '62b55fa0f96df4d764f6722d',
    fullName: 'Maudy Ayunda',
    avatar: '',
    lastChat: "I'll be in your neighborhood doing errands this…",
    time: 'Saturday',
  },
  {
    fullName: 'Steve Job',
    avatar: '',
    lastChat: "Wish I could come, but I'm out of town this…",
    time: 'Saturday',
  },
  {
    fullName: 'Elon Musk',
    avatar: '',
    lastChat: 'Do you have Paris recommendations? Have you ever…',
    time: 'Saturday',
  },
  {
    fullName: 'Anya Geraldine',
    avatar: '',
    lastChat: "I'll be in your neighborhood doing errands this…",
    time: 'Saturday',
  },
];

const Message = () => (
  <>
    <MessageBar />
    <MessageList chatData={chatData} />
  </>
);

export default Message;
