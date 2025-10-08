import { Container } from '@mui/material';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <Container className='p-0 m-0 min-h-screen h-screen w-full max-w-full '>
      <Outlet />
    </Container>
  );
};

export default AuthLayout;
