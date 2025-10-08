import { createEvent } from '@/api/eventsApi';
import { getVerifiedTemples } from '@/api/templeApi';
import { Close } from '@mui/icons-material';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import { useEffect, useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const EventModal = ({ open, onClose }) => {
  const [eventData, setEventData] = useState({
    templeId: '',
    details: '',
    eventDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorAlert, setShowErrorAlert] =
    useState(false);
  const [showSuccessAlert, setShowSuccessAlert] =
    useState(false);
  const [devataMandirs, setDevataMandirs] = useState([]);
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async () => {
    try {
      const templeRes = await getVerifiedTemples();
      setDevataMandirs(templeRes?.data?.temples);
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.error ||
        err?.message;
      setError(message);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const closeHandler = () => {
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw Error('Please login to post an event');
      }
      await createEvent(eventData);
      onClose();
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
    <>
      <Snackbar
        open={showErrorAlert}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={closeHandler}
      >
        <Alert
          severity='error'
          onClose={closeHandler}
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
        onClose={closeHandler}
      >
        <Alert
          severity='success'
          onClose={closeHandler}
          className='mb-10'
        >
          Event is posted successfully
        </Alert>
      </Snackbar>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={modalStyle}
          component='form'
          onSubmit={handleSubmit}
          className='flex flex-col gap-2 relative'
        >
          <Button
            onClick={onClose}
            className={
              'absolute top-2 right-2 min-w-0 text-current'
            }
          >
            <Close className='text-current' />
          </Button>
          <Typography
            variant='h6'
            className='mb-5 font-semibold'
          >
            {eventData?.id
              ? 'Edit Event'
              : 'Post Your Fest'}
          </Typography>

          <FormControl fullWidth size='small'>
            <InputLabel>Select Your Temple</InputLabel>
            <Select
              label='Select Your Temple'
              name='templeId'
              value={eventData?.templeId}
              onChange={handleChange}
            >
              {devataMandirs?.map((mandir) => (
                <MenuItem key={mandir.id} value={mandir.id}>
                  {mandir?.mandirName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size='small'
            label='Event Date'
            name='eventDate'
            type='date'
            fullWidth
            margin='normal'
            value={eventData?.eventDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            size='small'
            label='Details'
            name='details'
            fullWidth
            multiline
            rows={3}
            margin='normal'
            value={eventData?.details}
            onChange={handleChange}
          />

          <Button
            type='submit'
            variant='contained'
            className='bg-brand-500 hover:bg-brand-600 text-white'
            onClick={handleSubmit}
            fullWidth
            loading={loading}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default EventModal;
