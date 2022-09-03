import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useNavigate } from 'react-router-dom';

function HomeBar() {
  const navigate = useNavigate();

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
          <IconButton color="inherit">
            <Badge
              badgeContent={7}
              color="error"
              onClick={() => navigate('/notifications')}
            >
              <FavoriteBorderIcon fontSize="medium" />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/message')}>
            <Badge badgeContent={1} color="error">
              <ChatIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default HomeBar;
