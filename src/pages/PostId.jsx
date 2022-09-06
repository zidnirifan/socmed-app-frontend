import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Post from '../components/Post';
import PostBar from '../components/PostBar';
import SkeletonPost from '../components/skeleton/SkeletonPost';
import { getPostById } from '../services/api';

function PostId() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  const getPost = useCallback(async () => {
    const postData = await getPostById(postId);

    setLoading(false);
    setPost(postData.data.post);
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <>
      {Object.keys(post).length !== 0 && (
        <PostBar username={post.user.username} />
      )}
      <Navbar />
      {loading ? (
        <>
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={50}
            sx={{ mb: 1.5 }}
          />
          <SkeletonPost />
        </>
      ) : (
        Object.keys(post).length !== 0 && <Post postData={post} />
      )}

      <Box height="50px" />
    </>
  );
}

export default PostId;
