import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HomeBar from '../components/HomeBar';
import Navbar from '../components/NavBar';
import Post from '../components/Post';
import {
  getFollowingPosts,
  getSuggestedPosts,
  getSuggestedUsers,
} from '../services/api';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SuggestedUserList from '../components/SuggestedUserList';
import SkeletonPost from '../components/SkeletonPost';

function Home() {
  const [loading, setLoading] = useState(true);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const getHomeData = useCallback(async () => {
    const following = await getFollowingPosts();
    const users = await getSuggestedUsers();
    const suggested = await getSuggestedPosts();

    setLoading(false);
    setFollowingPosts(following.data.posts);
    setSuggestedPosts(suggested.data.posts);
    setSuggestedUsers(users.data.users);
  }, []);

  const fetchMoreData = async () => {
    const posts = await getSuggestedPosts();

    setSuggestedPosts(suggestedPosts.concat(posts.data.posts));
  };

  useEffect(() => {
    getHomeData();
  }, [getHomeData]);

  return (
    <>
      <Navbar />
      <HomeBar />
      {loading ? (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      ) : (
        <>
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
          {followingPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', marginTop: 2, marginBottom: 2 }}>
              <CameraAltOutlinedIcon sx={{ width: 70, height: 70 }} />
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                No posts yet
              </Typography>
            </Box>
          ) : (
            followingPosts.map((post) => <Post postData={post} key={post.id} />)
          )}

          <Typography
            variant="h6"
            sx={{
              marginTop: 1,
              paddingLeft: 2,
            }}
          >
            Suggested for you
          </Typography>
          <SuggestedUserList users={suggestedUsers} />

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
      )}
    </>
  );
}

export default Home;
