import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  AppBar,
  IconButton,
  Toolbar,
} from '@mui/material';
import {
  Dashboard,
  Event,
  People,
  Logout,
  TempleHindu,
  DisplaySettings,
} from '@mui/icons-material';
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '@/assets/images/logo.png';
import { useState, useEffect } from 'react';

const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/admin/dashboard',
    },
    {
      text: 'Temples',
      icon: <TempleHindu />,
      path: '/admin/temples',
    },
    {
      text: 'Events',
      icon: <Event />,
      path: '/admin/events',
    },
    {
      text: 'Users',
      icon: <People />,
      path: '/admin/users',
    },
    {
      text: 'Home Page Content',
      icon: <DisplaySettings />,
      path: '/admin/homePageContent',
    },
    { text: 'Logout', icon: <Logout /> },
  ];

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const drawerContent = (
    <Box className='flex-1 flex flex-col gap-10 p-4'>
      <NavLink
        to='/'
        className='flex justify-center items-center space-x-4'
      >
        <img src={Logo} width={50} alt='Logo' />
      </NavLink>

      <List className='flex flex-col gap-2'>
        {menuItems.map((item) => {
          const isLogout = item.text === 'Logout';

          return (
            <ListItem
              key={item.text}
              disablePadding
              className='rounded-md'
            >
              {isLogout ? (
                <div
                  onClick={logoutHandler}
                  className='w-full group flex items-center px-4 py-2 space-x-3 rounded-md
                  hover:bg-brand-500 hover:text-white transition-colors duration-200 cursor-pointer'
                >
                  <ListItemIcon
                    sx={{ minWidth: 40 }}
                    className='text-inherit group-hover:text-white'
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className='group-hover:text-white'
                  />
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full group flex items-center px-4 py-2 space-x-3 rounded-md transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-brand-500 text-white'
                        : 'hover:bg-brand-500 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <ListItemIcon
                        sx={{ minWidth: 40 }}
                        className={`${
                          isActive ? 'text-white' : ''
                        } group-hover:text-white`}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        className='group-hover:text-white'
                      />
                    </>
                  )}
                </NavLink>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        elevation={0}
        className='bg-white shadow-sm'
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor='left'
        variant='temporary'
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box className='flex justify-end p-2'>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        {drawerContent}
      </Drawer>

      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          mt: { xs: 6, md: 0 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
