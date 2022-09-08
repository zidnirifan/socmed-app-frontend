import { Box, Typography } from '@mui/material';
import { grey, purple } from '@mui/material/colors';

export default function ChatItem({ side, chat, time }) {
  const isLeft = side === 'left';

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
            whiteSpace: 'pre-line',
          }}
        >
          {chat}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            ml: isLeft ? 1 : 0,
            mr: isLeft ? 0 : 1,
            display: 'block',
            textAlign: side,
          }}
        >
          {time}
        </Typography>
      </Box>
    </Box>
  );
}
