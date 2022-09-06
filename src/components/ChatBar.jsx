import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../services/api';

function ChatBar() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const getUserData = useCallback(async () => {
    const user = await getUserById(userId);

    setUser(user.data.user);
  }, [userId]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, justifyContent: 'flex-start' }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 4,
              justifyContent: 'flex-start',
            }}
          >
            <Avatar sx={{ width: 37, height: 37 }} src={user.profilePhoto} />
            <Typography
              variant="subtitle1"
              sx={{ alignSelf: 'center', marginLeft: 1 }}
            >
              {user.fullName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
          >
            <IconButton color="inherit">
              <PhoneIcon fontSize="medium" />
            </IconButton>
            <IconButton color="inherit">
              <VideocamIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default ChatBar;
