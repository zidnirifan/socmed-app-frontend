import { ImageList, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ThumbnailList({ posts }) {
  const navigate = useNavigate();

  return (
    <ImageList cols={3} rowHeight={140} gap={1} sx={{ marginTop: 0 }}>
      {posts.map((item) => (
        <ImageListItem
          key={item.id}
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
  );
}
