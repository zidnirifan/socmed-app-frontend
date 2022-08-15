import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentBar from '../components/CommentBar';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { useSelector, useDispatch } from 'react-redux';
import { getComments, commentSelector } from '../redux/features/commentSlice';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';

const Comments = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();
  const comments = useSelector(commentSelector.selectAll);

  useEffect(() => {
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  return (
    <>
      <CommentBar />
      {comments.length === 0 ? (
        <Box sx={{ textAlign: 'center', marginTop: 10 }}>
          <CommentsDisabledIcon sx={{ width: 50, height: 50 }} />
          <Typography variant="h5">No Comment</Typography>
        </Box>
      ) : (
        <CommentList comments={comments} />
      )}
      <CommentInput />
      <Box height="50px" />
    </>
  );
};

export default Comments;
