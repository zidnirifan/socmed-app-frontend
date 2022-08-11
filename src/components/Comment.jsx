import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { grey, lightBlue } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likeComment as likeCommentApi } from '../services/api';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Comment({ comment, index }) {
  const myRef = useRef();
  const navigate = useNavigate();

  const [isLikedState, setIsLikedState] = useState(comment.isLiked);
  const [likesCountState, setLikesCountState] = useState(comment.likesCount);

  const newCommentId = window.location.hash.slice(1);

  const likeComment = async () => {
    await likeCommentApi(comment.postId, comment.id);
    setLikesCountState(
      isLikedState ? likesCountState - 1 : likesCountState + 1
    );
    setIsLikedState(!isLikedState);
  };

  useEffect(() => {
    if (comment.id === newCommentId) {
      myRef.current.scrollIntoView();
    }
  });

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          sx={{ top: '-150%' }}
          onClick={likeComment}
        >
          {isLikedState ? (
            <FavoriteIcon color="error" sx={{ width: 20 }} />
          ) : (
            <FavoriteBorderIcon sx={{ width: 20 }} />
          )}
        </IconButton>
      }
      sx={{
        alignItems: 'flex-start',
        backgroundColor: comment.id === newCommentId ? lightBlue[100] : '',
      }}
      key={index}
      className="comment-card"
      id={comment.id}
      ref={comment.id === newCommentId ? myRef : undefined}
    >
      <ListItemAvatar>
        <Avatar
          alt={comment.user.username}
          src={comment.user.profilePhoto}
          sx={{ width: 30, height: 30 }}
        />
      </ListItemAvatar>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.7 }}>
          {comment.user.username}{' '}
          <Typography
            variant="body2"
            display={comment.replyTo ? 'inline' : 'none'}
            color={lightBlue[600]}
            onClick={() => navigate(`/profile/${comment.replyTo?.user.id}`)}
          >
            @{comment.replyTo?.user.username}
          </Typography>
          <Typography variant="body2" display="inline">
            {' '}
            {comment.content}
          </Typography>
        </Typography>
        <Typography
          variant="caption"
          sx={{ marginRight: 3.5, fontWeight: 500, color: grey[600] }}
        >
          {comment.createdAt}
        </Typography>
        <Typography
          variant="caption"
          sx={{ marginRight: 3.5, fontWeight: 500, color: grey[600] }}
        >
          {likesCountState} likes
        </Typography>
        <Typography
          variant="caption"
          sx={{ marginRight: 3.5, fontWeight: 500, color: grey[600] }}
        >
          Reply
        </Typography>
      </Box>
    </ListItem>
  );
}
