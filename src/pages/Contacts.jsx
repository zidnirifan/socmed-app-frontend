import { Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getFollowing, getSuggestedUsers } from '../services/api';
import { getLocalUser } from '../services/token';
import ContactList from '../components/ContactList';
import ContactBar from '../components/ContactBar';

function Contacts() {
  const { id: userId } = getLocalUser();

  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const suggested = await getSuggestedUsers();
    const following = await getFollowing(userId);

    setSuggestedUsers(suggested.data.users);
    setFollowingUsers(following.data.users);
  }, [userId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <ContactBar />
      <Typography
        variant="body1"
        sx={{
          mt: 1,
          paddingLeft: 2,
          fontWeight: 500,
        }}
      >
        Following
      </Typography>
      <ContactList users={followingUsers} />

      <Typography
        variant="body1"
        sx={{
          marginTop: 1,
          paddingLeft: 2,
          fontWeight: 500,
        }}
      >
        Suggested for you
      </Typography>
      <ContactList users={suggestedUsers} />
    </>
  );
}

export default Contacts;
