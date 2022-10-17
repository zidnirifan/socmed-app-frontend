import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { followUser as followUserApi } from '../services/api';
import { useEffect, useState } from 'react';

export default function UserItem({
  user: { id, username, fullName, profilePhoto, isFollowed },
}) {
  const navigate = useNavigate();

  const [isFollowedState, setIsFollowedState] = useState(null);

  const followUser = async () => {
    await followUserApi(id);
    setIsFollowedState(!isFollowedState);
  };

  useEffect(() => {
    setIsFollowedState(isFollowed);
  }, [isFollowed]);

  return (
    <Box>
      <ListItem alignItems="center">
        <ListItemAvatar
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`/profile/${id}`)}
        >
          <Avatar alt={username} src={profilePhoto} />
        </ListItemAvatar>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ flexGrow: 1, fontWeight: 500, cursor: 'pointer' }}
              onClick={() => navigate(`/profile/${id}`)}
            >
              {username}
              <Typography variant="body2" color={grey[600]} display="block">
                {fullName}
              </Typography>
            </Typography>
            <Box>
              <Button
                variant={isFollowedState ? 'outlined' : 'contained'}
                size="small"
                sx={{ paddingX: 2 }}
                onClick={followUser}
              >
                {isFollowedState ? 'Following' : 'Follow'}
              </Button>
            </Box>
          </Box>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Box>
  );
}
