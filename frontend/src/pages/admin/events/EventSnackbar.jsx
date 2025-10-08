import { Snackbar, Alert } from '@mui/material';

const EventSnackbars = ({ showError, error, onClose }) => (
  <>
    <Snackbar
      open={showError}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onClose}
    >
      <Alert
        severity='error'
        onClose={onClose}
        className='mb-10'
      >
        {error}
      </Alert>
    </Snackbar>
  </>
);

export default EventSnackbars;
