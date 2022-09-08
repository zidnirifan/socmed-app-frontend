import { AppBar, IconButton, InputBase, Toolbar, styled } from '@mui/material';
import CameraIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLocalUser } from '../services/token';
import { useParams } from 'react-router-dom';
import { sendChat } from '../redux/features/chatSlice';

const ChatInput = styled('div')(() => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  marginLeft: 0,
  marginRight: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    paddingLeft: 13,
    paddingTop: 1,
    paddingBottom: 1,
    transition: theme.transitions.create('width'),
  },
  width: '100%',
}));

function ChatForm({ bottomRef }) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const { userId: foreignUserId } = useParams();
  const { id: ownUserId, username } = getLocalUser();

  const handleSend = async () => {
    if (value) {
      await dispatch(
        sendChat({
          chat: value,
          from: ownUserId,
          to: foreignUserId,
          fromUsername: username,
        })
      );
      setValue('');
      bottomRef.current.scrollIntoView();
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{
          top: 'auto',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '600px',
        }}
      >
        <Toolbar
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 1,
            paddingRight: 1,
          }}
          variant="dense"
        >
          <Box sx={{ flexGrow: 1 }}>
            <IconButton color="inherit" sx={{ padding: 0 }}>
              <CameraIcon sx={{ width: 27, height: 27 }} />
            </IconButton>
            <IconButton color="inherit" sx={{ padding: 0 }}>
              <ImageIcon sx={{ width: 27, height: 27 }} />
            </IconButton>
          </Box>
          <ChatInput sx={{ flexGrow: 13 }}>
            <StyledInputBase
              placeholder="Message..."
              inputProps={{ 'aria-label': 'search' }}
              multiline={true}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </ChatInput>
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, padding: 0, justifyContent: 'flex-end' }}
            onClick={handleSend}
          >
            <SendIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default ChatForm;
