import { ImageList, ImageListItem } from '@mui/material';
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

  const fetchMoreData = async () => {
    const posts = await getExplorePostsMedia();

    setItems(items.concat(posts.data.posts));
  };

  const getExplorePosts = useCallback(async () => {
    const posts = await getExplorePostsMedia();

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
          hasMore={true}
          loader={<SkeletonExplore amount={6} />}
        >
          <ImageList cols={3} rowHeight={140} gap={1} sx={{ marginTop: 0 }}>
            {items.map((item, i) => (
              <ImageListItem
                key={i}
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
