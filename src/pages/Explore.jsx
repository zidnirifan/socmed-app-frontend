import Navbar from '../components/NavBar';
import SearchNavbar from '../components/SearchBar';
import { useCallback, useEffect, useState } from 'react';
import { getExplorePostsMedia } from '../services/api';
import ThumbnailList from '../components/ThumbnailList';

function Explore() {
  const [posts, setPosts] = useState([]);

  const getHomePostList = useCallback(async () => {
    const posts = await getExplorePostsMedia();
    console.log(posts);

    setPosts(posts.data.posts);
  }, []);

  useEffect(() => {
    getHomePostList();
  }, [getHomePostList]);

  return (
    <>
      <Navbar />
      <SearchNavbar />
      <ThumbnailList posts={posts} />
    </>
  );
}

export default Explore;
