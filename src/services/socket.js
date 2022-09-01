export const joinRoom = (socket, ownUserId) => {
  socket.emit('join-room', ownUserId);
};

export const receiveChat = (socket, handleReceiveChat) => {
  socket.on('receive-chat', handleReceiveChat);
};

export const sendChat = (socket, data) => {
  socket.emit('send-chat', data);
};
