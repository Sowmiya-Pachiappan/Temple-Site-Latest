import { Snackbar, Alert } from '@mui/material';

const UserSnackbars = ({ showError, error, onClose }) => {
  return (
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
};

export default UserSnackbars;
