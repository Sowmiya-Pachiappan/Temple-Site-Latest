import { Navigate, Outlet } from 'react-router';

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (user && token && user.role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to='/' />;
  }
};

export default AdminRoute;
