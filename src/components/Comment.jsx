import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Comment({ comment, index }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" sx={{ top: '-150%' }}>
          <FavoriteBorderIcon />
        </IconButton>
      }
      sx={{ alignItems: 'flex-start' }}
      key={index}
      className="comment-card"
    >
      <ListItemAvatar>
        <Avatar
          alt={comment.fullName}
          src={comment.avatar}
          sx={{ width: 30, height: 30 }}
        />
      </ListItemAvatar>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.7 }}>
          jhondoe{' '}
          <Typography variant="body2" display="inline">
            {' '}
            Ini adalah komen seorang netijen Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Impedit autem nam ullam maxime
            voluptatem dolor quam aliquid, temporibus non possimus placeat ab
            explicabo quia quidem eveniet sint, optio unde at!
          </Typography>
        </Typography>
        <Typography
          variant="caption"
          sx={{ marginRight: 3.5, fontWeight: 500, color: grey[600] }}
        >
          30m
        </Typography>
        <Typography
          variant="caption"
          sx={{ marginRight: 3.5, fontWeight: 500, color: grey[600] }}
        >
          30 likes
        </Typography>
        <Typography
          variant="caption"
          sx={{ marginRight: 3.5, fontWeight: 500, color: grey[600] }}
        >
          Reply
        </Typography>
      </Box>
    </ListItem>
  );
}
