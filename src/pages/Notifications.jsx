import { useCallback, useEffect, useState } from 'react';
import NotifBar from '../components/NotifBar';
import NotifList from '../components/NotifList';
import SkeletonList from '../components/skeleton/SkeletonList';
import { getNotifications, readNotifications } from '../services/api';

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
      ) : (
        <NotifList notifications={notifications} />
      )}
    </>
  );
}
