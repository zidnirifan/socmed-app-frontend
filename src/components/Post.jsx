import { useState } from 'react';
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  MobileStepper,
  Typography,
  styled,
  InputBase,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwipeableViews from 'react-swipeable-views';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import {
  likePost as likePostApi,
  addComment as addCommentApi,
} from '../services/api';
import { getLocalUser } from '../services/token';

const CommentInput = styled('div')(({ theme }) => ({
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
  fontSize: 14,
}));

function Post({ postData }) {
  const {
    id,
    user,
    caption,
    media,
    likesCount,
    createdAt,
    isLiked,
    commentsCount,
  } = postData;

  const userLocal = getLocalUser();

  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const [comment, setComment] = useState('');
  const [displayMore, setDisplayMore] = useState('inline');
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = media.length;

  const navigate = useNavigate();

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const likePost = async () => {
    await likePostApi(id);
    setLikesCountState(
      isLikedState ? likesCountState - 1 : likesCountState + 1
    );
    setIsLikedState(!isLikedState);
  };

  const addComment = async () => {
    const { data } = await addCommentApi(id, { content: comment });

    navigate(`/post/${id}/comments/#${data.commentId}`);
  };

  const writeComment = (e) => {
    setComment(e.target.value);
  };

  const handleExpandClick = () => {
    setDisplayMore('none');
    setExpanded(true);
  };

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <CardHeader
        avatar={<Avatar src={user.profilePhoto} />}
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={user.username}
        sx={{ paddingTop: '10px', paddingBottom: '10px', cursor: 'pointer' }}
        onClick={() => navigate(`/profile/${user.id}`)}
      />
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        onDoubleClick={likePost}
      >
        {media.map((step, index) => (
          <div key={step}>
            {Math.abs(activeStep - index) <= 2 ? (
              <CardMedia component="img" image={step} />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <CardActions disableSpacing sx={{ paddingBottom: 0 }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <IconButton aria-label="add to favorites" onClick={likePost}>
            {isLikedState ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton
            aria-label="comment"
            onClick={() => navigate(`/post/${postData.id}/comments`)}
          >
            <CommentIcon />
          </IconButton>
        </Box>
        {media.length > 1 && (
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              justifyContent: 'center',
              flexBasis: 0,
              flexGrow: 1,
              padding: 0,
            }}
          />
        )}
        <IconButton
          aria-label="comment"
          sx={{
            flexBasis: 0,
            flexGrow: 1,
            justifyContent: 'flex-end',
            padding: 0,
          }}
        >
          <BookmarkIcon />
        </IconButton>
      </CardActions>
      <CardContent sx={{ paddingTop: 0, paddingBottom: '10px !important' }}>
        <Typography variant="body2" fontWeight={500} sx={{ mb: 0.7 }}>
          {likesCountState} likes
        </Typography>
        <Typography
          variant="body2"
          display={caption ? 'inline' : 'none'}
          fontWeight={500}
        >
          {user.username}
          <span>&nbsp;</span>
        </Typography>
        <Typography
          variant="body2"
          display={displayMore}
          sx={{ whiteSpace: 'pre-line' }}
          onClick={caption?.length > 55 ? handleExpandClick : () => {}}
        >
          {caption?.slice(0, 55)}
          {caption?.length > 55 && (
            <Typography
              component="span"
              variant="body2"
              onClick={handleExpandClick}
              aria-label="show more"
              color="text.secondary"
              sx={{ cursor: 'pointer', fontWeight: 500 }}
            >
              ... more
            </Typography>
          )}
        </Typography>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          collapsedSize="10px"
          display="inline"
        >
          <Typography
            variant="body2"
            display="inline"
            sx={{ whiteSpace: 'pre-line' }}
          >
            {caption}
          </Typography>
        </Collapse>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.7, cursor: 'pointer' }}
          display={commentsCount ? 'block' : 'none'}
          onClick={() => navigate(`/post/${postData.id}/comments`)}
        >
          View all {commentsCount} comments
        </Typography>
        <Box sx={{ display: 'flex', mt: 0.7 }}>
          <IconButton sx={{ padding: 0, justifyContent: 'flex-end' }}>
            <Avatar
              src={userLocal.profilePhoto}
              sx={{ flexGrow: 1, height: 25, width: 25 }}
            />
          </IconButton>
          <CommentInput sx={{ flexGrow: 13 }}>
            <StyledInputBase
              placeholder="Add a comment..."
              inputProps={{ 'aria-label': 'search' }}
              size="small"
              multiline
              onChange={writeComment}
            />
          </CommentInput>
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, padding: 0, justifyContent: 'flex-end' }}
            onClick={addComment}
          >
            <SendIcon sx={{ width: 22, height: 22 }} />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.7 }}>
          {createdAt}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Post;
