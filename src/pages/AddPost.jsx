import {
  Avatar,
  Button,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Image } from '@mui/icons-material';
import { Box } from '@mui/system';
import Navbar from '../components/NavBar';
import CameraIcon from '@mui/icons-material/CameraAlt';
import { grey } from '@mui/material/colors';
import AddPostBar from '../components/AddPostBar';

const UserBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
});

const AddPost = () => {
  return (
    <>
      <Navbar />
      <AddPostBar />
      <Box
        bgcolor={'background.default'}
        color={'text.primary'}
        p={3}
        borderRadius={5}
      >
        <UserBox>
          <Avatar
            src="https://material-ui.com/static/images/avatar/2.jpg"
            sx={{ width: 35, height: 35 }}
          />
          <Typography fontWeight={500} variant="subtitle2">
            zidni_rifan
          </Typography>
        </UserBox>
        <TextField
          sx={{ width: '100%' }}
          id="caption"
          multiline
          rows={3}
          placeholder="What's on your mind?"
          variant="standard"
        />
        <Stack direction="row" gap={1} mt={2} mb={3}>
          <CameraIcon color={grey[500]} fontSize="large" />
          <Image color={grey[500]} fontSize="large" />
        </Stack>
        <Button fullWidth variant="contained">
          Post
        </Button>
      </Box>
    </>
  );
};

export default AddPost;
