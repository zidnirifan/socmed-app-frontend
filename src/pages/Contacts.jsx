import { Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getFollowing, getSuggestedUsers } from '../services/api';
import { getLocalUser } from '../services/token';
import ContactList from '../components/ContactList';
import ContactBar from '../components/ContactBar';
import SkeletonList from '../components/skeleton/SkeletonList';

function Contacts() {
  const { id: userId } = getLocalUser();

  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const suggested = await getSuggestedUsers();
    const following = await getFollowing(userId);

    setLoading(false);
    setSuggestedUsers(suggested.data.users);
    setFollowingUsers(following.data.users);
  }, [userId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <ContactBar />
      {loading ? (
        <SkeletonList amount={10} />
      ) : (
        <>
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
      )}
    </>
  );
}

export default Contacts;
