import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';

function Post() {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title="zidni_rifan"
        sx={{ paddingTop: '10px', paddingBottom: '10px' }}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography variant="body2" display="inline" fontWeight={500}>
          zidni_rifan<span>&nbsp;</span>
        </Typography>
        <Typography variant="body2" display="inline" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Post;
