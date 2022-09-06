import { ImageList, ImageListItem, Skeleton } from '@mui/material';

export default function SkeletonExplore({ amount }) {
  let arr = [];
  for (let step = 0; step < amount; step++) {
    arr.push(null);
  }

  return (
    <ImageList cols={3} rowHeight={140} gap={2} sx={{ marginTop: 0 }}>
      {arr.map((_, i) => (
        <ImageListItem key={i}>
          <Skeleton variant="rectangular" height={'100%'} animation="wave" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
