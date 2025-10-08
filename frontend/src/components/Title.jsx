import { Stack } from '@mui/material';

const Title = ({ title, subTitle }) => {
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        <Stack gap={0.5} alignItems={'flex-end'}>
          <div className='h-0.5 w-5 bg-brand-500 rounded-full'></div>
          <div className='h-0.5 w-10 bg-brand-500 rounded-full'></div>
        </Stack>
        <h6 className='text-brand-500 font-bold  text-center md:text-left'>
          {subTitle}
        </h6>
        <Stack gap={0.5} alignItems={'flex-start'}>
          <div className='h-0.5 w-5 bg-brand-500 rounded-full'></div>
          <div className='h-0.5 w-10 bg-brand-500 rounded-full'></div>
        </Stack>
      </Stack>
      <h3 className='font-semibold text-2xl'>{title}</h3>
    </>
  );
};

export default Title;
