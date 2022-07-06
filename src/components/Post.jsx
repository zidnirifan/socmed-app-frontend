import { useState } from 'react';
import {
  alpha,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  MobileStepper,
  Typography,
  styled,
  InputBase,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import SwipeableViews from 'react-swipeable-views';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

const images = [
  {
    label: 'San Francisco - Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
];

const ChatInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: 10,
    transition: theme.transitions.create('width'),
  },
  width: '100%',
  fontSize: 14,
}));

function Post() {
  const [displayMore, setDisplayMore] = useState('inline');

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const navigate = useNavigate();

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setDisplayMore('none');
    setExpanded(true);
  };

  return (
    <Card sx={{ maxWidth: 600, boxShadow: 'none' }}>
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
        onClick={() => navigate('/profile')}
      />
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <CardMedia
                component="img"
                image={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <CardActions disableSpacing sx={{ paddingBottom: 0 }}>
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
        </Box>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            justifyContent: 'center',
            flexBasis: 0,
            flexGrow: 1,
            padding: 0,
          }}
        />
        <IconButton
          aria-label="comment"
          sx={{
            flexBasis: 0,
            flexGrow: 1,
            justifyContent: 'flex-end',
            padding: 0,
          }}
        >
          <BookmarkIcon />
        </IconButton>
      </CardActions>
      <CardContent sx={{ paddingTop: 0, paddingBottom: '10px !important' }}>
        <Typography variant="body2" fontWeight={500} sx={{ mb: 0.7 }}>
          9.876 likes
        </Typography>
        <Typography variant="body2" display="inline" fontWeight={500}>
          zidni_rifan<span>&nbsp;</span>
        </Typography>
        <Typography
          variant="body2"
          display={displayMore}
          onClick={handleExpandClick}
        >
          This impressive paella is a perfect party dish and
          <Typography
            variant="body2"
            onClick={handleExpandClick}
            aria-label="show more"
            display={displayMore}
            color="text.secondary"
          >
            ... more
          </Typography>
        </Typography>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          collapsedSize="10px"
          display="inline"
        >
          <Typography variant="body2" display="inline">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </Collapse>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.7 }}>
          View all 1.789 comments
        </Typography>
        <Box sx={{ display: 'flex', mt: 0.7 }}>
          <IconButton sx={{ padding: 0, justifyContent: 'flex-end' }}>
            <Avatar
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{ flexGrow: 1, height: 25, width: 25 }}
            />
          </IconButton>
          <ChatInput sx={{ flexGrow: 13 }}>
            <StyledInputBase
              placeholder="Add a comment..."
              inputProps={{ 'aria-label': 'search' }}
              size="small"
            />
          </ChatInput>
          <IconButton
            color="inherit"
            sx={{ flexGrow: 1, padding: 0, justifyContent: 'flex-end' }}
          >
            <SendIcon sx={{ width: 22, height: 22 }} />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.7 }}>
          1 day ago
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Post;
