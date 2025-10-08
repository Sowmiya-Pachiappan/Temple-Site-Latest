import { Outlet } from 'react-router';
import Footer from './components/Footer';
import Header from './components/Header';
import { Stack } from '@mui/material';

const AppLayout = () => {
  return (
    <Stack className='min-h-screen'>
      <Header />
      <Stack className='m-0 w-full max-w-full flex-2'>
        <Outlet />
      </Stack>
      <Footer />
    </Stack>
  );
};

export default AppLayout;
