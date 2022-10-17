import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { followUser as followUserApi } from '../services/api';
import { useState } from 'react';

export default function NotifItem({
  notif: { type, user, postId, text, commentId, createdAt },
}) {
  const navigate = useNavigate();

  const navigateNotif = () => {
    if (type === 'follow') navigate(`/profile/${user.id}`);
    if (type === 'like-post') navigate(`/post/${postId}`);
    if (type === 'comment' || type === 'reply-comment') {
      navigate(`/post/${postId}/comments#${commentId}`);
    }
  };

  const [isFollowed, setIsFollowed] = useState(user.isFollowed);

  const followUser = async () => {
    await followUserApi(user.id);
    setIsFollowed(!isFollowed);
  };

  return (
    <Box>
      <ListItem alignItems="center">
        <ListItemAvatar
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          <Avatar alt={user.username} src={user.profilePhoto} />
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
              variant="body2"
              sx={{ flexGrow: 2, fontWeight: 500, cursor: 'pointer' }}
              onClick={navigateNotif}
            >
              {user.username}{' '}
              <Typography variant="body2" component="span">
                {text}.{' '}
              </Typography>
              <Typography variant="body2" component="span" color={grey[600]}>
                {createdAt}
              </Typography>
            </Typography>
            {type === 'follow' && (
              <Box sx={{ mt: 0.5, flexGrow: 1, textAlign: 'end' }}>
                <Button
                  variant={isFollowed ? 'outlined' : 'contained'}
                  size="small"
                  sx={{ paddingX: 2 }}
                  onClick={followUser}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Box>
  );
}
