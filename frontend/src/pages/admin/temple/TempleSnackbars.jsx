import { Snackbar, Alert } from '@mui/material';

const TempleSnackbars = ({
  showSuccess,
  showError,
  error,
  onClose,
}) => (
  <>
    <Snackbar
      open={showSuccess}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onClose}
    >
      <Alert
        severity='success'
        onClose={onClose}
        className='mb-10'
      >
        Temple is verified successfully
      </Alert>
    </Snackbar>

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

export default TempleSnackbars;
