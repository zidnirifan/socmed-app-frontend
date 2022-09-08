import { Box, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import NotifBar from '../components/NotifBar';
import NotifList from '../components/NotifList';
import SkeletonList from '../components/skeleton/SkeletonList';
import { getNotifications, readNotifications } from '../services/api';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const getNotif = useCallback(async () => {
    const { data } = await getNotifications();
    setLoading(false);
    setNotifications(data.notifs);
    readNotifications();
  }, []);

  useEffect(() => {
    getNotif();
  }, [getNotif]);

  return (
    <>
      <NotifBar />
      {loading ? (
        <SkeletonList amount={10} />
      ) : notifications.length === 0 ? (
        <Box sx={{ textAlign: 'center', marginTop: 3, marginBottom: 2 }}>
          <NotificationsOffOutlinedIcon sx={{ width: 70, height: 70 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            No notifications yet
          </Typography>
        </Box>
      ) : (
        <NotifList notifications={notifications} />
      )}
    </>
  );
}
