import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { socketSelector } from '../redux/features/chatSlice';
import { useEffect, useState } from 'react';
import { receiveChat, receiveNotif } from '../services/socket';
import { useCallback } from 'react';
import { getCountNotifChat } from '../services/api';

function HomeBar() {
  const navigate = useNavigate();
  const { socket } = useSelector(socketSelector);

  const [notif, setNotif] = useState(0);
  const [chat, setChat] = useState(0);

  if (socket) {
    receiveNotif(socket, () => {
      const pathUrl = window.location.pathname;
      if (pathUrl === '/') {
        setNotif(notif + 1);
      }
    });
    receiveChat(socket, () => {
      const pathUrl = window.location.pathname;
      if (pathUrl === '/') {
        setChat(chat + 1);
      }
    });
  }

  const getNotif = useCallback(async () => {
    const { data } = await getCountNotifChat();
    setNotif(data.notif);
    setChat(data.chat);
  }, []);

  useEffect(() => {
    getNotif();
  }, [chat, getNotif, notif, socket]);

  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar variant="dense">
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Satisfy', fontSize: '1.8rem' }}
            onClick={() => navigate('/')}
          >
            Insapgan
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/add-post')}>
            <AddCircleIcon fontSize="medium" />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => navigate('/notifications')}
          >
            <Badge badgeContent={notif} color="error">
              <FavoriteBorderIcon fontSize="medium" />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/message')}>
            <Badge badgeContent={chat} color="error">
              <ChatIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HomeBar;
