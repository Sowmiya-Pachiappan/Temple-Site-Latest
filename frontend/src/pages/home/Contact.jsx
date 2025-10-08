import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';
import Image from '@/assets/images/decorativeLamp.png';
import Image1 from '@/assets/images/om-logo.png';
import { useEffect, useState } from 'react';
import { sendContactMessage } from '@/api/contactApi';
import { getVerifiedTemples } from '@/api/templeApi';

const Contact = () => {
  const [contactData, setContactData] = useState({
    templeId: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorAlert, setShowErrorAlert] =
    useState(false);
  const [showSuccessAlert, setShowSuccessAlert] =
    useState(false);
  const [devataMandirs, setDevataMandirs] = useState([]);

  const fetchData = async () => {
    try {
      const templeRes = await getVerifiedTemples();
      setDevataMandirs(templeRes?.data?.temples || []);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (!token) {
        throw Error('Please login to send your thoughts');
      }
      await sendContactMessage({
        ...contactData,
        name: user.name,
        email: user.email,
      });

      setShowSuccessAlert(true);
      setContactData({ templeId: '', message: '' });
    } catch (err) {
      const message =
        err.response?.data?.message || err.message;
      setError(message);
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') return;
    setShowErrorAlert(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') return;
    setShowSuccessAlert(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div
      id='contact'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='relative flex flex-col px-5 md:px-10 md:flex-row items-center justify-center py-7 md:py-10 gap-6 bg-brand-50'
    >
      <motion.div
        className='z-10 w-full md:w-3/5 text-gray-800'
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Stack gap={1} alignItems={'start'}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            gap={2}
          >
            <Stack gap={0.5} alignItems={'flex-end'}>
              <div className='h-0.5 w-5 bg-brand-500 rounded-full'></div>
              <div className='h-0.5 w-10 bg-brand-500 rounded-full'></div>
            </Stack>
            <h6 className='text-brand-500 font-bold'>
              CONTACT US
            </h6>
            <Stack gap={0.5} alignItems={'flex-start'}>
              <div className='h-0.5 w-5 bg-brand-500 rounded-full'></div>
              <div className='h-0.5 w-10 bg-brand-500 rounded-full'></div>
            </Stack>
          </Stack>
          <h3 className='font-semibold text-2xl'>
            Connect with the Divine Space
          </h3>
          <p className='text-gray-600'>
            Whether you have a prayer request, a question
            about temple services, or just want to send your
            blessings, we are here to listen. Reach out and
            feel the spiritual connection.
          </p>
          <Box className='flex-1 mb-10'>
            <Typography
              variant='body1'
              className='text-current mb-5 border-b-[50%] border-brand-500'
            >
              Follow Us:
            </Typography>
            <Stack
              className='text-gray-500 mb-5'
              gap={4}
              direction={'row'}
            >
              <i className='fi fi-brands-facebook text-2xl cursor-pointer hover:text-brand-500'></i>
              <i className='fi fi-brands-instagram text-2xl cursor-pointer hover:text-brand-500'></i>
              <i className='fi fi-brands-youtube text-2xl cursor-pointer hover:text-brand-500'></i>
            </Stack>
            <Typography
              variant='body1'
              className='text-current mb-5 border-b-[50%] border-brand-500'
            >
              Contact Us:
            </Typography>
            <Stack className='text-gray-500' gap={2}>
              <Stack direction={'row'} gap={1}>
                <span>
                  <i className='fi fi-rr-envelope text-xl'></i>
                </span>
                support@templeconnect.com
              </Stack>
              <Stack direction={'row'} gap={1}>
                <span>
                  <i className='fi fi-rr-phone-call text-xl'></i>
                </span>
                +91 98765 43210
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </motion.div>

      <img
        src={Image}
        alt='Spiritual Connection'
        className='absolute z-0 -right-60 top-0 h-full'
      />

      <Snackbar
        open={showErrorAlert}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleCloseError}
      >
        <Alert
          severity='error'
          onClose={handleCloseError}
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
        onClose={handleCloseSuccess}
      >
        <Alert
          severity='success'
          onClose={handleCloseSuccess}
          className='mb-10'
        >
          Thank you for reaching out! We’ve received your
          message and will get back to you shortly.
        </Alert>
      </Snackbar>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className='md:w-2/5 w-full'
      >
        <Card className='rounded-3xl bg-white/90 w-full backdrop-blur-lg shadow-2xl'>
          <CardContent className='p-6 md:p-8'>
            <Stack alignItems={'center'}>
              <img
                src={Image1}
                alt='Spiritual Connection'
                className='w-40'
              />
            </Stack>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-5'
            >
              <FormControl fullWidth size='small'>
                <InputLabel>Select Your Temple</InputLabel>
                <Select
                  label='Select Your Temple'
                  name='templeId'
                  value={contactData?.templeId}
                  onChange={handleChange}
                >
                  {devataMandirs?.map((mandir) => (
                    <MenuItem
                      key={mandir.id}
                      value={mandir.id}
                    >
                      {mandir?.mandirName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                value={contactData?.message}
                onChange={handleChange}
                size='small'
                label='Message'
                name='message'
                variant='outlined'
                fullWidth
                required
                multiline
                rows={4}
              />
              <div className='text-right'>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={loading}
                  className='block md:inline bg-brand-500 text-white px-6 py-2 rounded-md hover:bg-brand-600 transition-colors duration-300 shadow-md'
                >
                  Send Your Thoughts
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
