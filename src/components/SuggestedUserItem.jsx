import { Avatar, Button, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { followUser as followUserApi } from '../services/api';

export default function SuggestedUserItem({
  user: { id, username, fullName, profilePhoto, isFollowed },
}) {
  const [isFollowedState, setIsFollowedState] = useState(isFollowed);

  const followUser = async () => {
    await followUserApi(id);
    setIsFollowedState(!isFollowedState);
  };

  return (
    <Card
      sx={{ width: 220, display: 'inline-block', marginX: 0.5 }}
      variant="outlined"
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Avatar
          src={profilePhoto}
          sx={{
            width: '135px',
            height: '135px',
            display: 'inline-flex',
            mb: 1,
          }}
        />
        <Typography variant="body1" component="div" sx={{ fontWeight: 600 }}>
          {username}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {fullName}
        </Typography>
        <Button
          variant={isFollowedState ? 'outlined' : 'contained'}
          size="small"
          sx={{ width: '85%' }}
          onClick={followUser}
        >
          {isFollowedState ? 'Following' : 'Follow'}
        </Button>
      </CardContent>
    </Card>
  );
}
