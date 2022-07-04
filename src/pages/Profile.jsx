import {
  Avatar,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import Navbar from '../components/NavBar';
import { grey } from '@mui/material/colors';
import GridIcon from '@mui/icons-material/GridOnOutlined';
import StandardImageList from '../components/PostList';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

function Profile() {
  return (
    <>
      <Navbar />
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
            <Avatar
              aria-label="recipe"
              sx={{ width: 90, height: 90, margin: 'auto' }}
            />
          </Grid>
          <Grid item xs={8} container>
            <Grid item xs={4} sx={{ paddingTop: 3.5 }}>
              <Typography
                variant="subtitle1"
                textAlign="center"
                sx={{ fontWeight: 500, lineHeight: 1 }}
              >
                99
              </Typography>
              <Typography component="p" variant="caption" textAlign="center">
                Posts
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ paddingTop: 3.5 }}>
              <Typography
                variant="subtitle1"
                textAlign="center"
                sx={{ fontWeight: 500, lineHeight: 1 }}
              >
                990K
              </Typography>
              <Typography component="p" variant="caption" textAlign="center">
                Followers
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ paddingTop: 3.5 }}>
              <Typography
                variant="subtitle1"
                textAlign="center"
                sx={{ fontWeight: 500, lineHeight: 1 }}
              >
                99
              </Typography>
              <Typography component="p" variant="caption" textAlign="center">
                Following
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Container>
        <Typography variant="subtitle2">Zidni Rifan Ifana</Typography>
        <Typography variant="subtitle2" color={grey[500]}>
          Software Engineer
        </Typography>
        <Box sx={{ marginTop: 2, padding: '0 10%' }}>
          <Button variant="outlined" size="small" sx={{ width: '48%' }}>
            Follow
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ width: '48%', float: 'right' }}
          >
            Message
          </Button>
        </Box>
      </Container>
      <Tabs
        value={0}
        variant="fullWidth"
        aria-label="icon position tabs example"
      >
        <Tab icon={<GridIcon />} />
      </Tabs>
      <StandardImageList posts={itemData} />
    </>
  );
}

export default Profile;
