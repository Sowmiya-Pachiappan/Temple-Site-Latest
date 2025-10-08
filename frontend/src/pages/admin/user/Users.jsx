import { getUsers } from '@/api/userApi';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import UserSnackbars from './UserSnackbars';
import UserTable from './UserTable';
import UserDrawer from './UserDrawer';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] =
    useState(false);
  const [showErrorAlert, setShowErrorAlert] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data.users);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message;
      setError(message);
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };
  const viewHandler = (id) => {
    const user = users.find((t) => t.id === id);
    setSelectedUser(user);
    setDrawerOpen(true);
  };
  console.log(selectedUser);
  const closeHandler = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const rows = users.map((user) => ({
    id: user.id,
    ...user,
  }));
  return (
    <Box className='flex flex-col gap-10'>
      <Typography
        variant='h4'
        className='font-bold text-2xl'
      >
        Manage Users
      </Typography>
      <UserSnackbars
        showSuccess={showSuccessAlert}
        showError={showErrorAlert}
        error={error}
        onClose={closeHandler}
      />
      <UserTable
        rows={rows}
        loading={loading}
        onView={viewHandler}
      />
      <UserDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={selectedUser}
      />
    </Box>
  );
};

export default Users;
