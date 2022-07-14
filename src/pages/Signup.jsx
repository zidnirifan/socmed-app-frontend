import { Button, Container, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

export default function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    fullName: '',
    password: '',
  });
  const [usernameCheck, setUsernameCheck] = useState({
    invalid: false,
    message: '',
  });
  const [fullNameCheck, setFullNameCheck] = useState({
    invalid: false,
    message: '',
  });
  const [passwordCheck, setPasswordCheck] = useState({
    invalid: false,
    message: '',
  });
  const [confirmPassword, setConfirmPassword] = useState({
    invalid: false,
    message: '',
  });

  const validateUsername = (e) => {
    const { value } = e.target;
    if (value.length < 5) {
      setUsernameCheck({
        invalid: true,
        message: 'username must be at least 5 character',
      });
    } else if (!value.match(/^[\w]+$/)) {
      setUsernameCheck({
        invalid: true,
        message: 'username contain restricted character',
      });
    } else {
      setUsernameCheck({ invalid: false, message: '' });
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
  const validatePassword = (e) => {
    const { value } = e.target;
    if (value.length < 8) {
      setPasswordCheck({
        invalid: true,
        message: 'password must be at least 8 character',
      });
    } else {
      setPasswordCheck({ invalid: false, message: '' });
    }
  };
  const validateConfirmPassword = (e) => {
    const { value } = e.target;
    if (value !== user.password) {
      setConfirmPassword({
        invalid: true,
        message: 'password not match',
      });
    } else {
      setConfirmPassword({ invalid: false, message: '' });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const register = async () => {
    if (!user.username || !user.fullName || !user.password) return;
    if (
      fullNameCheck.invalid ||
      usernameCheck.invalid ||
      passwordCheck.invalid ||
      confirmPassword.invalid
    )
      return;

    const response = await registerUser(user);

    if (response.status === 'success') {
      await loginUser({
        username: user.username,
        password: user.password,
      });
      return navigate('/signup-photo');
    }
    if (
      response.status === 'fail' &&
      response.message === 'username already exist'
    ) {
      return setUsernameCheck({
        invalid: true,
        message: 'username already exist',
      });
    }
    console.log('fail', response);
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          marginTop: 5,
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
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ fontFamily: 'Satisfy', marginBottom: 3 }}
        >
          Insapgan
        </Typography>
        <Typography variant="h4" fontSize="1.7rem">
          Register
        </Typography>
        <hr
          style={{
            color: 'grey',
            backgroundColor: 'grey',
            width: '100%',
            height: 1,
            marginBottom: 20,
          }}
        />
        <TextField
          error={fullNameCheck.invalid}
          helperText={fullNameCheck.message}
          id="fullName"
          name="fullName"
          label="Full name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={user.fullName}
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
          value={user.username}
          onChange={handleChangeInput}
          onBlur={validateUsername}
        />
        <TextField
          error={passwordCheck.invalid}
          helperText={passwordCheck.message}
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={user.password}
          onChange={handleChangeInput}
          onBlur={validatePassword}
        />
        <TextField
          error={confirmPassword.invalid}
          helperText={confirmPassword.message}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
          onBlur={validateConfirmPassword}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={register}
        >
          Sign up
        </Button>
        <Typography variant="body1" sx={{ marginTop: 1.3 }}>
          Already have an account?<span>&nbsp;</span>
          <Link
            variant="body1"
            underline="hover"
            onClick={() => navigate('/login')}
          >
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
