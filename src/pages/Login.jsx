import { Button, Container, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [usernameCheck, setUsernameCheck] = useState({
    invalid: false,
    message: '',
  });
  const [passwordCheck, setPasswordCheck] = useState({
    invalid: false,
    message: '',
  });

  const validateUsername = (e) => {
    const { value } = e.target;
    if (value.length < 1) {
      setUsernameCheck({
        invalid: true,
        message: 'username cannot be empty',
      });
    } else {
      setUsernameCheck({ invalid: false, message: '' });
    }
  };

  const validatePassword = (e) => {
    const { value } = e.target;
    if (value.length < 1) {
      setPasswordCheck({
        invalid: true,
        message: 'password cannot be empty',
      });
    } else {
      setPasswordCheck({ invalid: false, message: '' });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    if (!user.username || !user.password) return;
    if (usernameCheck.invalid || passwordCheck.invalid) return;
    const { status, message } = await loginUser(user);

    if (status === 'success') {
      navigate('/');
    }

    if (status === 'fail' && message === 'username not found') {
      return setUsernameCheck({
        invalid: true,
        message,
      });
    }

    if (status === 'fail' && message === 'wrong password') {
      return setPasswordCheck({
        invalid: true,
        message,
      });
    }
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          marginTop: 15,
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
          sx={{ fontFamily: 'Satisfy', marginBottom: 1 }}
        >
          Insapgan
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
          error={usernameCheck.invalid}
          helperText={usernameCheck.message}
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
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
          sx={{ marginBottom: 1 }}
          onChange={handleChangeInput}
          onBlur={validatePassword}
        />
        <Link
          variant="body1"
          underline="hover"
          sx={{ alignSelf: 'flex-end', marginBottom: 1.2 }}
          onClick={() => navigate('/forget')}
        >
          Forgot password?
        </Link>
        <Button fullWidth variant="contained" color="primary" onClick={login}>
          Log In
        </Button>
        <Typography variant="body1" sx={{ marginTop: 1.3 }}>
          Don't have an account?<span>&nbsp;</span>
          <Link
            variant="body1"
            underline="hover"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
