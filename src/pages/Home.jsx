import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HomeBar from '../components/HomeBar';
import Navbar from '../components/NavBar';
import Post from '../components/Post';
import { getFollowingPosts, getSuggestedPosts } from '../services/api';

function Home() {
  const [followingPosts, setFollowingPosts] = useState([]);
  const [suggestedPosts, setSuggestedPosts] = useState([]);

  const getHomePostList = useCallback(async () => {
    const following = await getFollowingPosts();
    const suggested = await getSuggestedPosts();

    setFollowingPosts(following.data.posts);
    setSuggestedPosts(suggested.data.posts);
  }, []);

  const fetchMoreData = async () => {
    const posts = await getSuggestedPosts();

    setSuggestedPosts(suggestedPosts.concat(posts.data.posts));
  };

  useEffect(() => {
    getHomePostList();
  }, [getHomePostList]);

  return (
    <>
      <Navbar />
      <HomeBar />
      <Typography
        variant="h5"
        sx={{
          marginTop: 1,
          paddingLeft: 2,
          paddingBottom: 1,
        }}
      >
        Following Posts
      </Typography>
      {followingPosts.map((post) => (
        <Post postData={post} key={post.id} />
      ))}
      <Typography
        variant="h5"
        sx={{
          marginTop: 1,
          paddingLeft: 2,
          paddingBottom: 1,
          marginBottom: 1,
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.4)',
        }}
      >
        Suggested Posts
      </Typography>
      <InfiniteScroll
        dataLength={suggestedPosts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <Box sx={{ textAlign: 'center', mb: 10, mt: 3 }}>
            <CircularProgress size={30} />
          </Box>
        }
      >
        {suggestedPosts.map((post, i) => (
          <Post postData={post} key={i} />
        ))}
      </InfiniteScroll>
      <Box height="50px" />
    </>
  );
}

export default Home;
