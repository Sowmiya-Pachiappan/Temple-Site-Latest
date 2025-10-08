import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Grid,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UserDrawer = ({ open, onClose, user }) => {
  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box className='w-[400px] p-5 relative'>
        <IconButton
          onClick={onClose}
          className='text-gray-700 hover:text-gray-950 absolute top-5 right-5'
        >
          <CloseIcon />
        </IconButton>

        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          flexWrap='wrap'
        >
          <Typography
            variant='h5'
            mb={2}
            className='font-bold'
          >
            User Information
          </Typography>
        </Stack>
        <Divider className='mb-5' />

        {user ? (
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item size={12}>
                <Typography variant='body1'>
                  <strong>Name:</strong>{' '}
                  {user.title
                    ? user.title + '.' + ' ' + user.name
                    : user.name}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography variant='body1'>
                  <strong>Role:</strong> {user.role}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography variant='body1'>
                  <strong>Father's Name:</strong>{' '}
                  {user.fatherName || '—'}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography variant='body1'>
                  <strong>Mother's Name:</strong>{' '}
                  {user.motherName || '—'}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography variant='body1'>
                  <strong>Mobile:</strong>{' '}
                  {(user.mobileCode || '') +
                    ' ' +
                    (user.mobileNumber || '')}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography variant='body1'>
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography variant='body1'>
                  <strong>Member Reference:</strong>{' '}
                  {user.Referrer.name || '—'}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography variant='body1'>
                  <strong>Family Devata Mandir:</strong>{' '}
                  {user.familyDevata.mandirName || '—'}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        ) : (
          <Typography variant='body1' color='textSecondary'>
            No user selected.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default UserDrawer;
