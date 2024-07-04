import React from 'react';
import { Box, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessage } from './notificationSlice.slice';
import Alert from '@mui/material/Alert';

const CustomNotification = () => {
  const {
    message = '',
    severity = 'info',
    duration = 3000,
    isOpen = false,
  } = useSelector((state) => state.snackbar || {});

  const dispatch = useDispatch();

  const handleHideMessage = () => {
    dispatch(
      hideMessage()
    )
  }

  return (
    <Box>
      <Snackbar
        open={isOpen}
        autoHideDuration={duration}
        onClose={handleHideMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleHideMessage} severity={severity}
          variant="filled" sx={{ width: '100%', color: 'white' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
export default CustomNotification;