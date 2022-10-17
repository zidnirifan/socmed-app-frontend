import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  MobileStepper,
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
import { useState } from 'react';
import { addPost as addPostApi } from '../services/api';
import SwipeableViews from 'react-swipeable-views';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getLocalUser } from '../services/token';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const UserBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
});

const AddPost = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState([]);
  const [user, setUser] = useState({});
  const [mediaCheck, setMediaCheck] = useState({
    invalid: false,
    message: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const maxSteps = media.length;

  const handleCaptionInput = (e) => {
    setCaption(e.target.value);
  };

  const handleMediaInput = (e) => {
    const temp = media;
    for (const i of e.target.files) {
      temp.push(i);
    }
    setMedia(temp);

    setMediaCheck({
      invalid: false,
      message: '',
    });
  };

  const handleDeleteMedia = (index) => {
    const temp = [...media];
    temp.splice(index, 1);
    setMedia(temp);
    if (temp.length !== 0) setActiveStep(temp.length - 1);
  };

  const addPost = async () => {
    if (media.length === 0) {
      return setMediaCheck({
        invalid: true,
        message: 'Please add image',
      });
    }

    setLoading(true);

    const { data, status } = await addPostApi({ caption, media });

    if (status === 'fail') {
      setLoading(false);
    }

    if (status === 'success') {
      navigate(`/post/${data.postId}`);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const userLocal = getLocalUser();
    setUser(userLocal);
  }, []);

  return (
    <>
      <Navbar />
      <AddPostBar />
      <Box
        display={loading ? 'block' : 'none'}
        sx={{ textAlign: 'center', mt: 10 }}
      >
        <CircularProgress size={50} />
      </Box>
      <Box
        bgcolor={'background.default'}
        color={'text.primary'}
        p={3}
        borderRadius={5}
        display={loading ? 'none' : 'block'}
      >
        <UserBox>
          <Avatar src={user.profilePhoto} sx={{ width: 35, height: 35 }} />
          <Typography fontWeight={500} variant="subtitle2" sx={{ ml: 1 }}>
            {user.username}
          </Typography>
        </UserBox>
        <TextField
          error={mediaCheck.invalid}
          helperText={mediaCheck.message}
          sx={{ width: '100%' }}
          id="caption"
          name="caption"
          multiline
          minRows={3}
          placeholder="What's on your mind?"
          variant="standard"
          onChange={handleCaptionInput}
        />
        <Stack direction="row" gap={1} mt={2} mb={3} sx={{ cursor: 'pointer' }}>
          <CameraIcon color={grey[500]} fontSize="large" />
          <label htmlFor="media">
            <Image
              color={grey[500]}
              fontSize="large"
              sx={{ cursor: 'pointer' }}
            />
          </label>
          <input
            id="media"
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            style={{ visibility: 'hidden', width: 0, height: 0 }}
            multiple
            onChange={handleMediaInput}
          />
        </Stack>
        <Box sx={{ mb: 2 }}>
          <SwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {Array.from(media).map((step, index) => (
              <Box sx={{ position: 'relative' }} key={index}>
                <img
                  src={URL.createObjectURL(step)}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'white',
                    borderTopRightRadius: 0,
                    padding: 0.5,
                  }}
                  onClick={() => handleDeleteMedia(index)}
                >
                  <HighlightOffIcon color="error" fontSize="large" />
                </IconButton>
              </Box>
            ))}
          </SwipeableViews>
          {media.length > 1 && (
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={{
                justifyContent: 'center',
              }}
            />
          )}
        </Box>
        <Button fullWidth variant="contained" onClick={addPost}>
          Post
        </Button>
      </Box>
      <Box height="50px" />
    </>
  );
};

export default AddPost;
