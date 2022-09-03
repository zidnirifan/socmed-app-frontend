import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function NotifList({ notifData }) {
  const navigate = useNavigate();

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notifData.map((notif, i) => (
        <Box key={i}>
          <ListItem alignItems="center">
            <ListItemAvatar
              onClick={() => navigate(`/profile/${notif.user.id}`)}
            >
              <Avatar alt={notif.user.username} src={notif.user.profilePhoto} />
            </ListItemAvatar>
            <Box
              sx={{ width: '100%' }}
              onClick={() => navigate(`/message/${notif.id}/notif`)}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ flexGrow: 2, fontWeight: 500 }}
                >
                  {notif.user.username}{' '}
                  <Typography variant="body2" component="span">
                    {notif.text}.
                  </Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    color={grey[600]}
                  >
                    {notif.createdAt}
                  </Typography>
                </Typography>
                {notif.type === 'follow' && (
                  <Box sx={{ mt: 0.5, flexGrow: 1, textAlign: 'end' }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ paddingX: 2 }}
                    >
                      Follow
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </ListItem>
          <Divider variant="inset" component="li" />
        </Box>
      ))}
    </List>
  );
}
