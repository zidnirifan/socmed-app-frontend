import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function ChatList({ chatData }) {
  const navigate = useNavigate();

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {chatData.map((e) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar onClick={() => navigate('/profile')}>
              <Avatar alt="Remy Sharp" src={e.avatar} />
            </ListItemAvatar>
            <Box onClick={() => navigate('/message/chat')}>
              <Typography component="span" variant="subtitle1">
                {e.fullName}
                <Typography
                  component="span"
                  variant="body2"
                  color={grey[600]}
                  sx={{ float: 'right', mt: 0.5 }}
                >
                  {e.time}
                </Typography>
              </Typography>
              <Typography variant="body2" color={grey[600]}>
                {e.lastChat}
              </Typography>
            </Box>
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
