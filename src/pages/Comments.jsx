import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentBar from '../components/CommentBar';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { useSelector, useDispatch } from 'react-redux';
import {
  getComments,
  commentSelector,
  loadingSelector,
} from '../redux/features/commentSlice';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import SkeletonList from '../components/skeleton/SkeletonList';

const Comments = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();
  const comments = useSelector(commentSelector.selectAll);
  const loading = useSelector(loadingSelector);

  useEffect(() => {
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  return (
    <>
      <CommentBar />
      {loading ? (
        <SkeletonList amount={10} />
      ) : comments.length === 0 ? (
        <Box sx={{ textAlign: 'center', marginTop: 10 }}>
          <CommentsDisabledIcon sx={{ width: 50, height: 50 }} />
          <Typography variant="h5">No Comment</Typography>
        </Box>
      ) : (
        <>
          <CommentList comments={comments} />
          <Box height="50px" />
        </>
      )}
      <CommentInput />
    </>
  );
};

export default Comments;
