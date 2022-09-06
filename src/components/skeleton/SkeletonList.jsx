import { Grid, Skeleton } from '@mui/material';

export default function SkeletonList({ amount }) {
  let arr = [];
  for (let step = 0; step < amount; step++) {
    arr.push(null);
  }

  return (
    <Grid container spacing={2} sx={{ paddingX: 2, mt: 0.1 }}>
      {arr.map((_, i) => (
        <>
          <Grid item xs={2}>
            <Skeleton variant="circular" width={50} height={50} />
          </Grid>
          <Grid item xs={10} container>
            <Skeleton
              variant="rectangular"
              width={'100%'}
              height={30}
              sx={{ mt: 1.5 }}
            />
          </Grid>
        </>
      ))}
    </Grid>
  );
}
