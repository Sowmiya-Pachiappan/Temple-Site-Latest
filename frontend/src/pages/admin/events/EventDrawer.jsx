import {
  Box,
  Drawer,
  Typography,
  Grid,
  Divider,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const EventDrawer = ({ open, onClose, event }) => {
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
          direction={'row'}
          gap={2}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <Typography
            variant='h5'
            mb={2}
            className='font-bold'
          >
            Event Information
          </Typography>
        </Stack>
        <Divider className='mb-5' />

        {event ? (
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>Temple:</strong>{' '}
                  {event?.Temple?.mandirName}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>Event Date:</strong>{' '}
                  {event?.eventDate}
                </Typography>
              </Grid>

              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>Created By:</strong>{' '}
                  {event?.User?.name} {event?.phoneNumber}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>Details:</strong> {event?.details}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        ) : (
          <Typography variant='body1' color='textSecondary'>
            No event selected.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default EventDrawer;
