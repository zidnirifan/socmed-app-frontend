import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';

export default function MessageList({ chatData }) {
  const navigate = useNavigate();

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {chatData.map((chat, i) => (
        <Box key={i}>
          <ListItem alignItems="flex-start" sx={{ cursor: 'pointer' }}>
            <ListItemAvatar onClick={() => navigate(`/profile/${chat.id}`)}>
              <Avatar alt={chat.fullName} src={chat.profilePhoto} />
            </ListItemAvatar>
            <Box
              sx={{ width: '100%' }}
              onClick={() => navigate(`/message/${chat.id}/chat`)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  variant="subtitle1"
                  sx={{ flexGrow: 2, fontWeight: 500 }}
                >
                  {chat.fullName}
                </Typography>
                <Typography
                  variant="body2"
                  color={grey[600]}
                  sx={{ mt: 0.5, flexGrow: 1, textAlign: 'end' }}
                >
                  {chat.createdAt}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={grey[600]} display="block">
                  {chat.chat.slice(0, 70)}
                </Typography>
                {!chat.isRead && (
                  <Badge variant="dot" color="primary" sx={{ top: 9 }}></Badge>
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
