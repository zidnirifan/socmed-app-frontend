import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';

function ChatBar() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky">
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
            <Avatar sx={{ width: 37, height: 37 }} />
            <Typography
              variant="subtitle1"
              sx={{ alignSelf: 'center', marginLeft: 1 }}
            >
              Stranger User
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
