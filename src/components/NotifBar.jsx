import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';

export default function NotifBar() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar variant="dense">
          <IconButton color="inherit" onClick={() => navigate('/')}>
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 20, fontWeight: 500 }}
          >
            Notifications
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
