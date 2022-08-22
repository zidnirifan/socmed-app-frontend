import React from 'react';
import MessageList from '../components/MessageList';
import MessageBar from '../components/MessageBar';

const chatData = [
  {
    fullName: 'Stranger User',
    avatar: '',
    lastChat: "I'll be in your neighborhood doing errands this…",
    time: 'Saturday',
  },
  {
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
