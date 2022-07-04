import { ImageList, ImageListItem } from '@mui/material';

export default function StandardImageList({ posts }) {
  return (
    <ImageList cols={3} rowHeight={140} gap={1} sx={{ marginTop: 0 }}>
      {posts.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
