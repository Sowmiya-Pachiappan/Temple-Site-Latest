import { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import { MuiPhone } from '@/components/PhoneInput';
import { createTemple } from '@/api/templeApi';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: 700 },
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: { xs: 2, sm: 3, md: 4 },
  overflowY: 'auto',
};

const AddTemple = ({ onClose, open, setOpen }) => {
  const [formData, setFormData] = useState({
    mandirName: '',
    dietyName: '',
    description: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    phoneCode: '+91',
    phoneNumber: '',
    managedBy: '',
    mapLink: '',
    creatorEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      await createTemple(formData);
      setSnackbar({
        open: true,
        message:
          'Temple added successfully! And You will be notified once temple details are verified',
        severity: 'success',
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.message || 'Error adding temple.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
    onClose();
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          component='form'
          sx={modalStyle}
          onSubmit={handleSubmit}
        >
          <Typography variant='h6' mb={2}>
            Add New Temple
          </Typography>

          <Grid container spacing={2} className='w-full'>
            <Grid item size={6}>
              <TextField
                size='small'
                fullWidth
                name='mandirName'
                label='Mandir Name'
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={6}>
              <TextField
                required
                size='small'
                fullWidth
                name='dietyName'
                label='Diety Name'
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                size='small'
                fullWidth
                name='description'
                label='Description'
                multiline
                rows={3}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                size='small'
                fullWidth
                name='address'
                label='Address'
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={12} sm={4}>
              <TextField
                size='small'
                fullWidth
                name='district'
                label='District'
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={12} sm={4}>
              <TextField
                size='small'
                fullWidth
                name='state'
                label='State'
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={12} sm={4}>
              <TextField
                size='small'
                fullWidth
                name='pincode'
                label='Pincode'
                onChange={handleChange}
              />
            </Grid>

            <Grid item size={12}>
              <MuiPhone
                value={`${formData.phoneCode}${formData.phoneNumber}`}
                onChange={({
                  fullPhone,
                  mobileCode,
                  mobileNumber,
                }) => {
                  setFormData((prev) => ({
                    ...prev,
                    phoneCode: `${mobileCode}`,
                    phoneNumber: mobileNumber,
                  }));
                }}
                size='small'
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                size='small'
                fullWidth
                select
                name='managedBy'
                label='Managed By'
                onChange={handleChange}
              >
                <MenuItem value='Private'>Private</MenuItem>
                <MenuItem value='Government'>
                  Government
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item size={12}>
              <TextField
                size='small'
                fullWidth
                name='mapLink'
                label='Map Link'
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={12}>
              <TextField
                required
                size='small'
                fullWidth
                name='creatorEmail'
                label='Your Email'
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={12}>
              <Button
                loading={loading}
                type='submit'
                className='text-white w-full bg-brand-500 hover:bg-brand-600'
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddTemple;
