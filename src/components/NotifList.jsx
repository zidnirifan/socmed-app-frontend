import List from '@mui/material/List';
import NotifItem from './NotifItem';

export default function NotifList({ notifications }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notifications.map((notif, i) => (
        <NotifItem notif={notif} key={i} />
      ))}
    </List>
  );
}
