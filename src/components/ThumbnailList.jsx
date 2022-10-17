import { ImageList, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ThumbnailList({ posts }) {
  const navigate = useNavigate();
  const width = document.getElementById('root').offsetWidth;

  return (
    <ImageList
      cols={3}
      rowHeight={width / 3}
      gap={1}
      sx={{ marginTop: 0, overflow: 'hidden' }}
    >
      {posts.map((item) => (
        <ImageListItem
          key={item.id}
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
  );
}
