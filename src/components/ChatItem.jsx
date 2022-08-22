import { Box, Typography } from '@mui/material';
import { grey, purple } from '@mui/material/colors';

export default function ChatItem({ position, text }) {
  const isLeft = position === 'left';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isLeft ? 'row' : 'row-reverse',
      }}
    >
      <Box sx={{ maxWidth: '81%' }}>
        <Typography
          sx={{
            backgroundColor: isLeft ? grey[300] : purple[500],
            padding: 1,
            borderRadius: 3,
            color: isLeft ? 'black' : 'white',
          }}
        >
          {text}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            ml: isLeft ? 1 : 0,
            mr: isLeft ? 0 : 1,
            display: 'block',
            textAlign: position,
          }}
        >
          20.00
        </Typography>
      </Box>
    </Box>
  );
}
