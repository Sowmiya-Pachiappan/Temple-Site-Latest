import {
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import {
  connectTempleWithUser,
  getNotConnectedTemples,
  getVerifiedTemples,
} from '@/api/templeApi';

const FindMandir = ({ open, onClose }) => {
  const [temples, setTemples] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorAlert, setShowErrorAlert] =
    useState(false);
  const [showSuccessAlert, setShowSuccessAlert] =
    useState(false);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await getNotConnectedTemples();
          const fetchedTemples = res.data.temples || [];
          if (Array.isArray(fetchedTemples)) {
            setTemples(fetchedTemples);
          } else {
            throw new Error('Invalid response format');
          }
        } else {
          const res = await getVerifiedTemples();
          const fetchedTemples = res.data.temples || [];
          if (Array.isArray(fetchedTemples)) {
            setTemples(fetchedTemples);
          } else {
            throw new Error('Invalid response format');
          }
        }
      } catch (err) {
        console.error(
          'Failed to fetch temples:',
          err.message
        );
      }
    };

    if (open) {
      fetchTemples();
    }
  }, [open]);

  const handleClose = () => {
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
    onClose?.();
  };

  const connectHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) {
        throw Error(
          'Please login to connect with a temple'
        );
      }
      console.log(selectedTemple, user.id);
      await connectTempleWithUser({
        templeId: selectedTemple,
        userId: user.id,
      });

      setShowSuccessAlert(true);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message;
      setError(message);
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box>
        <Snackbar
          open={showErrorAlert}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handleClose}
        >
          <Alert
            severity='error'
            onClose={handleClose}
            className='mb-10'
          >
            {error}
          </Alert>
        </Snackbar>
        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handleClose}
        >
          <Alert
            severity='success'
            onClose={handleClose}
            className='mb-10'
          >
            Successfully connected to the selected mandir!
          </Alert>
        </Snackbar>

        <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg outline-none'>
          <div className='flex justify-between items-center mb-4'>
            <Typography
              variant='h6'
              className='font-semibold'
            >
              Find a Mandir
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <FormControl
            fullWidth
            size='small'
            className='mb-4'
          >
            <InputLabel id='temple-select-label'>
              Select Temple
            </InputLabel>
            <Select
              labelId='temple-select-label'
              value={selectedTemple}
              label='Select Temple'
              onChange={(e) =>
                setSelectedTemple(e.target.value)
              }
            >
              {Array.isArray(temples) &&
                temples.map((temple) =>
                  temple?.id && temple?.mandirName ? (
                    <MenuItem
                      key={temple.id}
                      value={temple.id}
                    >
                      {temple.mandirName}
                    </MenuItem>
                  ) : null
                )}
            </Select>
          </FormControl>

          <div className='mt-6 text-right'>
            <Button
              className='bg-brand-500 hover:bg-brand-600 text-white'
              onClick={connectHandler}
              disabled={loading || !selectedTemple}
            >
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default FindMandir;
