import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (user && token && user.role === 'user') {
    return <Outlet />;
  } else {
    return <Navigate to='/' />;
  }
};

export default PrivateRoute;
