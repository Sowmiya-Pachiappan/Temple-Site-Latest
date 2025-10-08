import { Box, Stack, Typography } from '@mui/material';
import FeatureImage1 from '@/assets/images/feature-1.png';
import FeatureImage2 from '@/assets/images/feature-2.png';
import FeatureImage3 from '@/assets/images/feature-3.png';

const Feature = () => {
  return (
    <div
      className='flex flex-col md:flex-row justify-center w-full py-7 md:py-10 z-10'
      id='feature'
    >
      <div className='text-white w-full  lg:w-5/6 rounded-md bg-linear-to-r from-brand-400 to-brand-500 p-10 shadow-xl'>
        <Stack
          direction='row'
          justifyContent={'space-between'}
          className='flex-col md:flex-row gap-10 text-center'
        >
          <Box>
            <Stack
              gap={2}
              justifyItems={'center'}
              alignItems={'center'}
            >
              <img
                src={FeatureImage1}
                width={60}
                height={60}
              />
              <Typography>
                Discover Temples Near You
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack
              gap={2}
              justifyItems={'center'}
              alignItems={'center'}
            >
              <img
                src={FeatureImage2}
                width={60}
                height={60}
              />
              <Typography>
                Share Your Temple's Story
              </Typography>
            </Stack>
          </Box>
          <Box>
            {' '}
            <Stack
              gap={2}
              justifyItems={'center'}
              alignItems={'center'}
            >
              <img
                src={FeatureImage3}
                width={60}
                height={60}
              />
              <Typography>Connect with Devotees</Typography>
            </Stack>
          </Box>
        </Stack>
      </div>
    </div>
  );
};

export default Feature;
