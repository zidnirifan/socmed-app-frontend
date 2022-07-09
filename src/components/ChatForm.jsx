import {
  alpha,
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  styled,
} from '@mui/material';
import CameraIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: 10,
    transition: theme.transitions.create('width'),
  },
  width: '100%',
}));

function ChatForm() {
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: 'auto',
          bottom: 0,
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
            />
          </ChatInput>
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, padding: 0, justifyContent: 'flex-end' }}
          >
            <SendIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default ChatForm;
