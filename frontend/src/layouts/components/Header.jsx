import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { Link as ScrollLink, scroller } from 'react-scroll';
import { useState, useEffect, useCallback } from 'react';
import {
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router';

import Logo from '@/assets/images/logo.png';
import UserAvatarMenu from '@/components/UserAvatarMenu';
import FindMandir from '@/pages/home/FindMandir';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState(
    location.hash.replace('#', '') || 'home'
  );
  const [showFindMandir, setShowFindMandir] =
    useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isLoggedIn = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const sections = [
    'home',
    'about',
    'outreach',
    'contact',
    'find mandir',
  ];

  const logoutHandler = async () => {
    await localStorage.removeItem('token');
    await localStorage.removeItem('user');
    navigate('/');
  };

  /** 🔥 Handle Scroll Spy */
  const handleScroll = useCallback(() => {
    const sectionEls = document.querySelectorAll('section');
    let found = false;

    for (const section of sectionEls) {
      const rect = section.getBoundingClientRect();

      if (rect.top <= 120 && rect.bottom >= 120 && !found) {
        const newActive = section.id;

        if (newActive !== activeSection) {
          setActiveSection(newActive);
          window.history.replaceState(
            null,
            '',
            `#${newActive}`
          );
        }
        found = true;
      }
    }
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /** 🔥 Handle initial scroll if there's a hash in URL */
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
      scroller.scrollTo(hash, {
        smooth: true,
        duration: 500,
        offset: -100,
      });
    } else {
      setActiveSection('home');
      scroller.scrollTo('home', {
        smooth: true,
        duration: 500,
        offset: -100,
      });
    }
  }, [location.hash]);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  /** 🔥 Classes for Nav Links */
  const navLinkClass = (sectionId) =>
    `relative inline-block px-3 py-2 text-base md:text-lg capitalize cursor-pointer transition-all duration-300 ease-in-out 
    ${
      activeSection === sectionId
        ? 'text-gray-700 font-semibold'
        : 'text-gray-700'
    }
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-brand-500 after:transition-all after:duration-300 
    ${
      activeSection === sectionId
        ? 'after:w-full'
        : 'after:w-0 hover:after:w-full'
    } 
    md:hover:text-brand-500`;

  /** 🔥 Render navigation links */
  const renderLinks = (onClickExtra = () => {}) =>
    sections.map((section) =>
      section !== 'find mandir' ? (
        <ScrollLink
          key={section}
          to={section}
          smooth={true}
          duration={500}
          offset={-100}
          onClick={() => {
            setTimeout(() => {
              setActiveSection(section);
              window.history.replaceState(
                null,
                '',
                `#${section}`
              );
              onClickExtra();
            }, 100);
          }}
        >
          <div className={navLinkClass(section)}>
            {section}
          </div>
        </ScrollLink>
      ) : (
        <div
          key={section}
          onClick={() => {
            setShowFindMandir(true);
            onClickExtra();
          }}
          className={navLinkClass(section)}
        >
          {section}
        </div>
      )
    );

  return (
    <>
      {/* Header AppBar */}
      <AppBar
        position='sticky'
        className='bg-white shadow-none px-6 py-4 z-50'
      >
        <Toolbar className='max-w-screen-xl mx-auto flex justify-between items-center w-full'>
          {/* Logo */}
          <NavLink
            to='/'
            className='flex items-center space-x-3'
          >
            <img src={Logo} width={50} alt='Logo' />
          </NavLink>

          {/* Desktop Navigation */}
          <Box className='hidden md:flex items-center space-x-6'>
            {renderLinks()}
            {!isLoggedIn ? (
              <>
                <NavLink
                  to='/login'
                  className='text-brand-500 font-medium hover:text-brand-600 transition'
                >
                  Login
                </NavLink>
                <NavLink
                  to='/register'
                  className='bg-brand-500 text-white rounded-xl px-4 py-2 hover:bg-brand-600 transition'
                >
                  Register
                </NavLink>
              </>
            ) : (
              <UserAvatarMenu
                user={user}
                onLogout={logoutHandler}
              />
            )}
          </Box>

          {/* Mobile Hamburger Icon */}
          <IconButton
            className='md:hidden'
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/*  Mobile Drawer */}
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box className='w-72 p-5'>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <img src={Logo} alt='Logo' width={40} />
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider className='my-4' />

          <List className='space-y-3 flex flex-col'>
            {renderLinks(toggleDrawer)}

            {!isLoggedIn ? (
              <>
                <ListItem disablePadding>
                  <NavLink
                    to='/login'
                    onClick={toggleDrawer}
                    className='w-full text-brand-500 px-3 py-2 hover:text-brand-600'
                  >
                    Login
                  </NavLink>
                </ListItem>
                <ListItem disablePadding>
                  <NavLink
                    to='/register'
                    onClick={toggleDrawer}
                    className='w-full bg-brand-500 text-white rounded-md text-center px-3 py-2 hover:bg-brand-600'
                  >
                    Register
                  </NavLink>
                </ListItem>
              </>
            ) : (
              <Box className='mt-4'>
                <UserAvatarMenu user={user} />
              </Box>
            )}
          </List>
        </Box>
      </Drawer>

      {/*  Find Mandir Dialog */}
      <FindMandir
        open={showFindMandir}
        onClose={() => setShowFindMandir(false)}
      />
    </>
  );
};

export default Header;
