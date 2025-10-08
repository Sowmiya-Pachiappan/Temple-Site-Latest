import { Box, Stack, Typography } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '@/assets/images/logo-white.png';

const Footer = () => {
  const sections = [
    { label: 'Home', to: 'home' },
    { label: 'Discover Temples', to: 'discover' },
    { label: 'Share Your Temple', to: 'share' },
    { label: 'Events', to: 'events' },
    { label: 'About Us', to: 'about' },
    { label: 'Contact', to: 'contact' },
  ];

  return (
    <Box
      component='footer'
      className='bg-gray-950 px-5 py-10 md:px-16 md:py-14'
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 8, md: 6 }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', md: 'flex-start' }}
        className='w-full'
      >
        <Box className='flex-1 flex flex-col gap-5'>
          <ScrollLink
            to='home'
            smooth={true}
            duration={500}
            offset={-100}
            className='flex items-center space-x-4 cursor-pointer'
          >
            <img src={Logo} width={70} alt='Logo' />
          </ScrollLink>
          <Typography
            variant='h4'
            className='text-xl text-white'
          >
            TempleConnect
          </Typography>
          <Typography
            variant='body1'
            className='text-gray-400 text-sm'
          >
            TempleConnect helps you explore, share, and
            connect with temples across the globe. It's more
            than just a directory—it's a cultural home for
            spiritual discovery and storytelling. Unite
            hearts, one temple at a time.
          </Typography>
        </Box>

        <Box className='flex-1'>
          <Typography
            variant='h4'
            className='text-xl text-white mb-5 relative after:content-[""] after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-[20%] md:after:w-[10%] after:bg-brand-500'
          >
            Quick Links
          </Typography>
          <Stack
            className='text-gray-400 text-sm'
            spacing={2}
          >
            {sections.map(({ label, to }) => (
              <ScrollLink
                key={to}
                to={to}
                smooth={true}
                duration={500}
                offset={-100}
                className='cursor-pointer hover:text-white transition-colors'
              >
                {label}
              </ScrollLink>
            ))}
          </Stack>
        </Box>

        <Box className='flex-1'>
          <Typography
            variant='h4'
            className='text-xl text-white mb-5 relative after:content-[""] after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-[20%] md:after:w-[10%] after:bg-brand-500'
          >
            Follow Us:
          </Typography>
          <Stack
            direction='row'
            spacing={4}
            className='text-gray-400 mb-8'
          >
            <i className='fi fi-brands-facebook text-2xl cursor-pointer hover:text-white'></i>
            <i className='fi fi-brands-instagram text-2xl cursor-pointer hover:text-white'></i>
            <i className='fi fi-brands-youtube text-2xl cursor-pointer hover:text-white'></i>
          </Stack>

          <Typography
            variant='h4'
            className='text-xl text-white mb-5 relative after:content-[""] after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-[20%] md:after:w-[10%] after:bg-brand-500'
          >
            Contact Us:
          </Typography>
          <Stack
            spacing={2}
            className='text-gray-400 text-sm'
          >
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
            >
              <i className='fi fi-rr-envelope text-xl'></i>
              <span>support@templeconnect.com</span>
            </Stack>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
            >
              <i className='fi fi-rr-phone-call text-xl'></i>
              <span>+91 98765 43210</span>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
