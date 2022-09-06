import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

export default function SkeletonChat({ amount }) {
  let arr = [];
  for (let step = 0; step < amount; step++) {
    arr.push(null);
  }

  return arr.map((_, i) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: i % 2 === 1 ? 'row-reverse' : 'row',
        paddingX: 2,
      }}
    >
      <Box sx={{ width: '70%' }}>
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={35}
          sx={{ mt: 1.5 }}
        />
      </Box>
    </Box>
  ));
}
