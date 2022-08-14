import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentBar from '../components/CommentBar';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { useSelector, useDispatch } from 'react-redux';
import { getComments, commentSelector } from '../redux/features/commentSlice';

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
      <CommentList comments={comments} />
      <CommentInput
        postId={postId}
        sendComment={() => console.log('hiyayaya')}
      />
      <Box height="50px" />
    </>
  );
};

export default Comments;
