import {
  alpha,
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  styled,
  Avatar,
} from '@mui/material';
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
    paddingLeft: 13,
    paddingTop: 1,
    paddingBottom: 1,
    transition: theme.transitions.create('width'),
  },
  width: '100%',
}));

function CommentInput() {
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
            <Avatar
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{ height: 30, width: 30 }}
            />
          </Box>
          <ChatInput sx={{ flexGrow: 13 }}>
            <StyledInputBase
              placeholder="Add a comment..."
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

export default CommentInput;
