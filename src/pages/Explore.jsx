import { ImageList, ImageListItem, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getExplorePostsMedia } from '../services/api';
import Navbar from '../components/NavBar';
import SearchNavbar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import SkeletonExplore from '../components/skeleton/SkeletonExplore';

export default function Explore() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [exceptPosts, setExceptPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const width = document.getElementById('root').offsetWidth;

  const fetchMoreData = async () => {
    const posts = await getExplorePostsMedia(exceptPosts);

    if (posts.data.posts.length === 0) setHasMore(false);
    const tempPostsId = posts.data.posts.map((p) => p.id);
    setExceptPosts(exceptPosts.concat(tempPostsId));
    setItems(items.concat(posts.data.posts));
  };

  const getExplorePosts = useCallback(async () => {
    const posts = await getExplorePostsMedia();

    const tempPostsId = posts.data.posts.map((p) => p.id);
    setExceptPosts(tempPostsId);
    setLoading(false);
    setItems(posts.data.posts);
  }, []);

  useEffect(() => {
    getExplorePosts();
    // to scroll to top when change menu
    window.scrollTo(0, 0);
  }, [getExplorePosts]);

  return (
    <>
      <Navbar />
      <SearchNavbar />
      {loading ? (
        <SkeletonExplore amount={15} />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          endMessage={
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 9 }}>
              No posts anymore
            </Typography>
          }
          loader={<SkeletonExplore amount={6} />}
        >
          <ImageList
            cols={3}
            rowHeight={width / 3}
            gap={1}
            sx={{ marginTop: 0, overflow: 'hidden' }}
          >
            {items.map((item, i) => (
              <ImageListItem
                key={i}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/post/${item.id}`)}
              >
                <img
                  src={item.media}
                  srcSet={item.media}
                  alt={item.id}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </InfiniteScroll>
      )}
    </>
  );
}
