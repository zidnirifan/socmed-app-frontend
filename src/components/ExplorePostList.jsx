import { ImageList, ImageListItem } from '@mui/material';

export default function ExplorePostList({ posts }) {
  return (
    <ImageList variant="masonry" cols={3} gap={0} sx={{ marginTop: 0 }}>
      {posts.map((item) => (
        <ImageListItem sx={{ display: 'block' }} key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
