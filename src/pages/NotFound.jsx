import HomeBar from '../components/HomeBar';
import Navbar from '../components/NavBar';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { Box, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <HomeBar />
      <Box sx={{ textAlign: 'center', marginTop: 10 }}>
        <FindInPageIcon sx={{ width: 100, height: 100, marginBottom: 2 }} />
        <Typography variant="h4">Page Not Found</Typography>
      </Box>
    </>
  );
}
