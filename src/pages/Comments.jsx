import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentBar from '../components/CommentBar';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { getCommentsByPostId } from '../services/api';
import { addComment as addCommentApi } from '../services/api';

const Comments = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    const commentsData = await getCommentsByPostId(postId);

    setComments(commentsData.data.comments);
  }, [postId]);

  const addComment = async (content) => {
    const { data } = await addCommentApi(postId, { content });

    navigate(`${window.location.pathname}#${data.commentId}`);
    const commentsData = await getCommentsByPostId(postId);

    setComments(commentsData.data.comments);
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <>
      <CommentBar />
      <CommentList comments={comments} />
      <CommentInput postId={postId} sendComment={addComment} />
      <Box height="50px" />
    </>
  );
};

export default Comments;
