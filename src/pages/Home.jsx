import { Typography } from '@mui/material';
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
import SkeletonPost from '../components/skeleton/SkeletonPost';

function Home() {
  const [loading, setLoading] = useState(true);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [exceptPosts, setExceptPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getHomeData = useCallback(async () => {
    const following = await getFollowingPosts();
    const users = await getSuggestedUsers();

    const tempPostsId = following.data.posts.map((p) => p.id);
    setExceptPosts(tempPostsId);
    setLoading(false);
    setFollowingPosts(following.data.posts);
    setSuggestedUsers(users.data.users);
  }, []);

  const fetchMoreData = async () => {
    const posts = await getSuggestedPosts(exceptPosts);
    if (posts.data.posts.length === 0) setHasMore(false);

    const tempPostsId = posts.data.posts.map((p) => p.id);
    setExceptPosts(exceptPosts.concat(tempPostsId));
    setSuggestedPosts(suggestedPosts.concat(posts.data.posts));
  };

  useEffect(() => {
    getHomeData();
    // to scroll to top when change menu
    window.scrollTo(0, 0);
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
            hasMore={hasMore}
            endMessage={
              <Typography variant="h4" sx={{ textAlign: 'center', mb: 5 }}>
                No posts anymore
              </Typography>
            }
            loader={<SkeletonPost />}
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
