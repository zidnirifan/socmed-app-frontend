import { Grid, Paper, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import SkeletonExplore from './SkeletonExplore';

export default function SkeletonProfile() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        paddingBottom: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Skeleton variant="circular" width={90} height={90} />
        </Grid>
        <Grid item xs={8} container>
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={60}
            sx={{ mt: 2.5 }}
          />
        </Grid>
      </Grid>
      <Skeleton
        variant="rectangular"
        width={'60%'}
        height={15}
        sx={{ mt: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width={'60%'}
        height={15}
        sx={{ mt: 1 }}
      />
      <Box sx={{ textAlign: 'center' }}>
        <Skeleton
          variant="rectangular"
          width={'70%'}
          height={40}
          sx={{ mt: 2, mb: 2, display: 'inline-block' }}
        />
      </Box>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <SkeletonExplore amount={6} />
    </Paper>
  );
}
