import { AppBar, Toolbar, Typography } from '@mui/material';

function AddPostBar() {
  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar variant="dense">
          <Typography
            variant="subtitle1"
            sx={{ flexGrow: 1, textAlign: 'center', fontSize: 18 }}
          >
            Create Post
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AddPostBar;
