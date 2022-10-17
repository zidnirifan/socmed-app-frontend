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
import ThumbnailList from '../components/ThumbnailList';
import { useCallback, useEffect, useState } from 'react';
import { getProfile as getProfileApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import OwnProfileBar from '../components/ownProfileBar';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { getLocalUser } from '../services/token';
import SkeletonProfile from '../components/skeleton/SkeletonProfile';

function OwnProfile() {
  const navigate = useNavigate();
  const { id } = getLocalUser();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const getProfile = useCallback(async () => {
    const userData = await getProfileApi('');

    setLoading(false);
    setUser(userData.data.userProfile);
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Navbar />
      <OwnProfileBar username={user.username} />
      {loading ? (
        <SkeletonProfile />
      ) : (
        <>
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
                  sx={{ width: 90, height: 90, margin: 'auto' }}
                  src={user.profilePhoto}
                />
              </Grid>
              <Grid item xs={8} container>
                <Grid item xs={4} sx={{ paddingTop: 3.5 }}>
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    sx={{ fontWeight: 500, lineHeight: 1 }}
                  >
                    {user.postsCount}
                  </Typography>
                  <Typography
                    component="p"
                    variant="caption"
                    textAlign="center"
                  >
                    Posts
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ paddingTop: 3.5, cursor: 'pointer' }}
                  onClick={() => navigate(`/${id}/followers`)}
                >
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    sx={{ fontWeight: 500, lineHeight: 1 }}
                  >
                    {user.followersCount}
                  </Typography>
                  <Typography
                    component="p"
                    variant="caption"
                    textAlign="center"
                  >
                    Followers
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{ paddingTop: 3.5, cursor: 'pointer' }}
                  onClick={() => navigate(`/${id}/following`)}
                >
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    sx={{ fontWeight: 500, lineHeight: 1 }}
                  >
                    {user.followingCount}
                  </Typography>
                  <Typography
                    component="p"
                    variant="caption"
                    textAlign="center"
                  >
                    Following
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Container>
            <Typography variant="subtitle2">{user.fullName}</Typography>
            <Typography
              variant="subtitle2"
              color={grey[500]}
              sx={{ whiteSpace: 'pre-line' }}
            >
              {user.bio}
            </Typography>
            <Box sx={{ marginTop: 2, padding: '0 15%' }}>
              <Button
                variant="outlined"
                size="small"
                sx={{ width: '100%' }}
                onClick={() => navigate('/edit-profile')}
              >
                Edit Profile
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
          {user.posts?.length === 0 ? (
            <Box sx={{ textAlign: 'center', marginTop: 5 }}>
              <CameraAltOutlinedIcon sx={{ width: 70, height: 70 }} />
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                No posts yet
              </Typography>
            </Box>
          ) : (
            <ThumbnailList posts={user.posts || []} />
          )}
        </>
      )}
      <Box height="50px" />
    </>
  );
}

export default OwnProfile;
