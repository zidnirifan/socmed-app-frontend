import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../services/api';

function FollowerBar() {
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
          <Typography
            variant="subtitle1"
            sx={{ flexGrow: 2, textAlign: 'center', fontSize: 18 }}
          >
            {user.username}
          </Typography>
          <IconButton
            sx={{ flexGrow: 1, justifyContent: 'flex-end' }}
          ></IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default FollowerBar;
