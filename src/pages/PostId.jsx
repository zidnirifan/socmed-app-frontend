import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Post from '../components/Post';
import PostBar from '../components/PostBar';
import { getPostById } from '../services/api';

function PostId() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  const getHomePostList = useCallback(async () => {
    const postData = await getPostById(postId);

    setPost(postData.data.post);
  }, [postId]);

  useEffect(() => {
    getHomePostList();
  }, [getHomePostList]);

  return (
    <>
      {Object.keys(post).length !== 0 && (
        <PostBar username={post.user.username} />
      )}
      <Navbar />
      {Object.keys(post).length !== 0 && <Post postData={post} />}
      <Box height="50px" />
    </>
  );
}

export default PostId;
