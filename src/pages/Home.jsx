import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import HomeBar from '../components/HomeBar';
import Navbar from '../components/NavBar';
import Post from '../components/Post';
import { getHomePosts } from '../services/api';

function Home() {
  const [posts, setPosts] = useState([]);

  const getHomePostList = useCallback(async () => {
    const posts = await getHomePosts();
    console.log(posts);

    setPosts(posts.data.posts);
  }, []);

  useEffect(() => {
    getHomePostList();
  }, [getHomePostList]);

  return (
    <>
      <Navbar />
      <HomeBar />
      {posts.map((post) => (
        <Post postData={post} key={post.id} />
      ))}
      <Box height="50px" />
    </>
  );
}

export default Home;
