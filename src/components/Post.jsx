import { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  MobileStepper,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import SwipeableViews from 'react-swipeable-views';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useNavigate } from 'react-router-dom';

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

function Post() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const navigate = useNavigate();

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

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
          sx={{ justifyContent: 'center', flexBasis: 0, flexGrow: 1 }}
        />
        <IconButton
          aria-label="comment"
          sx={{ flexBasis: 0, flexGrow: 1, justifyContent: 'flex-end' }}
        >
          <BookmarkIcon />
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
