import React from 'react';
import Typography from '@mui/material/Typography';
import { Backdrop } from '@mui/material';

function LoadingIcon() {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <img
        alt={'Loading'}
        src={
          'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDE4NGE2N2M0NThhNmE3ZmQ5MTUzZjE1NTdhZjJkZWFiYjNmMjc0YyZjdD1z/KcWaUe5tKkIrSI2LaU/giphy.gif'
        }
        width="100"
        height="100"
      />
      <Typography variant="h4">Loading....</Typography>
    </Backdrop>
  );
}

export default LoadingIcon;
