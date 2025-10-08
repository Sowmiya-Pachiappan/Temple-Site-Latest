import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Grid,
  Chip,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TempleDrawer = ({ open, onClose, temple }) => {
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
            Temple Information
          </Typography>
          <Chip
            label={
              temple?.isVerified
                ? 'Verified'
                : 'Not Verified'
            }
            color={
              temple?.isVerified ? 'success' : 'warning'
            }
            variant='outlined'
            className='self-start'
          />
        </Stack>
        <Divider className='mb-5' />

        {temple ? (
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 'bold' }}
                >
                  {temple?.mandirName}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>Diety:</strong>{' '}
                  {temple?.dietyName}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <strong>Description:</strong>{' '}
                  {temple?.description ||
                    'No description available.'}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>Address:</strong>{' '}
                  {temple?.address ||
                    'No address available.'}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>State:</strong> {temple?.state}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>District:</strong>{' '}
                  {temple?.district}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>Pincode:</strong>{' '}
                  {temple?.pincode}
                </Typography>
              </Grid>
              <Grid item size={12}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                >
                  <strong>Phone:</strong>{' '}
                  {temple?.phoneCode} {temple?.phoneNumber}
                </Typography>
              </Grid>
              {temple?.mapLink && (
                <Grid item size={12}>
                  <Button
                    className='w-full bg-brand-500 hover:bg-brand-600 text-white'
                    href={temple?.mapLink}
                    target='_blank'
                  >
                    View on Map
                  </Button>
                </Grid>
              )}
            </Grid>
          </Stack>
        ) : (
          <Typography variant='body1' color='textSecondary'>
            No temple selected.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default TempleDrawer;
