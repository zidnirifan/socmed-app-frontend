import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  styled,
  Avatar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { getLocalUser } from '../services/token';
import {
  getComments,
  replyToSelector,
  setReplyTo,
} from '../redux/features/commentSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment as addCommentApi, addReply } from '../services/api';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

const InputContainer = styled('div')(({ theme }) => ({
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

function CommentInput() {
  const dispatch = useDispatch();
  const replyTo = useSelector(replyToSelector);

  const navigate = useNavigate();
  const { postId } = useParams();

  const [content, setContent] = useState('');
  const [user, setUser] = useState({});

  const addComment = async () => {
    if (!replyTo.replyTo) {
    }
    const { data } = replyTo.replyTo
      ? await addReply(postId, {
          content,
          parentComment: replyTo.parentComment,
          replyTo: replyTo.replyTo,
        })
      : await addCommentApi(postId, { content });

    navigate(`${window.location.pathname}#${data.commentId}`);
    dispatch(getComments(postId));
    dispatch(setReplyTo({}));
    setContent('');
  };

  const closeReply = () => {
    dispatch(setReplyTo({}));
  };

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  useEffect(() => {
    const userLocal = getLocalUser();
    setUser(userLocal);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 48,
          backgroundColor: grey[300],
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '576px',
          display: replyTo.replyTo ? 'flex' : 'none',
          padding: 1.5,
        }}
      >
        <Typography
          variant="body2"
          component="h4"
          color={grey[700]}
          sx={{ flexGrow: 3 }}
        >
          Replying to {replyTo.username}
        </Typography>
        <IconButton
          sx={{
            flexGrow: 1,
            display: 'block',
            textAlign: 'right',
            padding: 0,
            paddingRight: 2.5,
            height: '24px',
          }}
          onClick={closeReply}
        >
          <CloseIcon />
        </IconButton>
      </Box>
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
            <Avatar src={user.profilePhoto} sx={{ height: 30, width: 30 }} />
          </Box>
          <InputContainer sx={{ flexGrow: 13 }}>
            <StyledInputBase
              placeholder="Add a comment..."
              inputProps={{ 'aria-label': 'search' }}
              multiline={true}
              value={content}
              onChange={handleChangeInput}
              id="comment-input"
            />
          </InputContainer>
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, padding: 0, justifyContent: 'flex-end' }}
            onClick={addComment}
          >
            <SendIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default CommentInput;
