import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';

function PostBar({ username }) {
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
          <Box sx={{ flexGrow: 2, textAlign: 'center' }}>
            <Typography
              variant="subtitle2"
              sx={{ lineHeight: 1.2, fontWeight: 'normal' }}
            >
              {username}
            </Typography>
            <Typography variant="subtitle1" sx={{ lineHeight: 1.2 }}>
              Post
            </Typography>
          </Box>
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

export default PostBar;
