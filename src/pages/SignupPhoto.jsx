import { Avatar, Button, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function SignupPhoto() {
  return (
    <Container>
      <Box
        component="form"
        sx={{
          marginTop: 17,
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
          sx={{ fontFamily: 'Satisfy', marginBottom: 5 }}
        >
          Insapgan
        </Typography>
        <Avatar sx={{ width: 120, height: 120, marginBottom: 1 }} />
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Change profile photo
        </Typography>
        <Button
          component={Link}
          to="/"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Skip
        </Button>
      </Box>
    </Container>
  );
}
