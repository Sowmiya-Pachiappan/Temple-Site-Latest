import { useState } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const UserAvatarMenu = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) =>
    setAnchorEl(event.currentTarget);
  const closeHandler = () => setAnchorEl(null);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <div className='relative'>
      <IconButton
        onClick={handleClick}
        size='small'
        className='ml-2'
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          className='bg-brand-500 w-10 h-10 text-white text-base'
          src={user?.avatarUrl}
        >
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={closeHandler}
        onClick={closeHandler}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        PaperProps={{
          className:
            'mt-3 rounded-lg shadow-lg border border-gray-100 min-w-[180px]',
        }}
      >
        <MenuItem
          onClick={logoutHandler}
          className='hover:bg-gray-100'
        >
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserAvatarMenu;
