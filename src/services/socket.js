export const joinChat = (socket, ownUserId) => {
  socket.emit('join-chat', ownUserId);
};

export const receiveChat = (socket, handleReceiveChat) => {
  socket.on('receive-chat', handleReceiveChat);
};

export const sendChat = (socket, data) => {
  socket.emit('send-chat', data);
};
