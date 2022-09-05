import { useCallback, useEffect, useState } from 'react';
import NotifBar from '../components/NotifBar';
import NotifList from '../components/NotifList';
import { getNotifications, readNotifications } from '../services/api';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const getNotif = useCallback(async () => {
    const { data } = await getNotifications();
    setNotifications(data.notifs);
    readNotifications();
  }, []);

  useEffect(() => {
    getNotif();
  }, [getNotif]);

  return (
    <>
      <NotifBar />
      <NotifList notifications={notifications} />
    </>
  );
}
