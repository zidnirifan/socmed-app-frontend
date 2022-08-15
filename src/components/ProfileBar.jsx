import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';

function ProfileBar({ username }) {
  const navigate = useNavigate();

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
            {username}
          </Typography>
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, justifyContent: 'flex-end' }}
          >
            <MoreHorizIcon fontSize="medium" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default ProfileBar;
