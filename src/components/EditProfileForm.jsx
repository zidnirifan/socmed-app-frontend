import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUser,
  setUser,
  setUsernameCheck,
  userSelector,
} from '../redux/features/userSlice';

export default function EditProfileForm() {
  const dispatch = useDispatch();
  const { user, usernameCheck } = useSelector(userSelector);

  const [fullNameCheck, setFullNameCheck] = useState({
    invalid: false,
    message: '',
  });

  const validateUsername = (e) => {
    const { value } = e.target;
    if (value.length < 5) {
      dispatch(
        setUsernameCheck({
          invalid: true,
          message: 'username must be at least 5 character',
        })
      );
    } else if (!value.match(/^[\w]+$/)) {
      dispatch(
        setUsernameCheck({
          invalid: true,
          message: 'username contain restricted character',
        })
      );
    } else {
      dispatch(setUsernameCheck({ invalid: false, message: '' }));
    }
  };
  const validateFullName = (e) => {
    const { value } = e.target;
    if (!value.length) {
      setFullNameCheck({
        invalid: true,
        message: 'full name cannot be empty',
      });
    } else {
      setFullNameCheck({ invalid: false, message: '' });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(setUser({ ...user, [name]: value }));
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Container>
      <Box
        component="form"
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          error={fullNameCheck.invalid}
          helperText={fullNameCheck.message}
          id="fullName"
          name="fullName"
          label="Full name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={user.fullName || ''}
          onChange={handleChangeInput}
          onBlur={validateFullName}
        />
        <TextField
          error={usernameCheck.invalid}
          helperText={usernameCheck.message}
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={user.username || ''}
          onChange={handleChangeInput}
          onBlur={validateUsername}
        />
        <TextField
          id="bio"
          name="bio"
          label="Bio"
          multiline
          variant="outlined"
          fullWidth
          minRows={2}
          sx={{ marginBottom: 2 }}
          value={user.bio || ''}
          onChange={handleChangeInput}
        />
      </Box>
    </Container>
  );
}
