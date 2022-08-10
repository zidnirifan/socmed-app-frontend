import { Box, CircularProgress, ImageList, ImageListItem } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getExplorePostsMedia } from '../services/api';
import Navbar from '../components/NavBar';
import SearchNavbar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const fetchMoreData = async () => {
    const posts = await getExplorePostsMedia();

    setItems(items.concat(posts.data.posts));
  };

  const getExplorePosts = useCallback(async () => {
    const posts = await getExplorePostsMedia();

    setItems(posts.data.posts);
  }, []);

  useEffect(() => {
    getExplorePosts();
  }, [getExplorePosts]);

  return (
    <>
      <Navbar />
      <SearchNavbar />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <Box sx={{ textAlign: 'center', mb: 10, mt: 3 }}>
            <CircularProgress size={50} />
          </Box>
        }
      >
        <ImageList cols={3} rowHeight={140} gap={1} sx={{ marginTop: 0 }}>
          {items.map((item, i) => (
            <ImageListItem key={i} onClick={() => navigate(`/post/${item.id}`)}>
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
    </>
  );
}
