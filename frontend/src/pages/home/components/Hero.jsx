import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Temple1 from '@/assets/images/temple-1.jpg';
import Temple2 from '@/assets/images/hero.jpg';
import Temple3 from '@/assets/images/temple-9.jpg';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`rounded-md relative flex flex-col md:flex-row bg-cover h-auto lg:h-[calc(100vh-104px)] bg-center bg-[url(@/assets/images/temple-2.jpeg)]`}
    >
      <div className='absolute rounded-md inset-0 bg-gradient-to-r from-black to-black opacity-75'></div>

      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className='relative z-10 flex flex-col gap-5 text-white h-full justify-center text-center p-4 md:p-10 w-full md:w-1/2'
      >
        <Typography
          variant='h4'
          className='leading-10 md:leading-12 font-normal text-3xl md:text-4xl md:font-semibold text-left'
        >
          Experience the Divine: Discover & Connect with{' '}
          <span className='text-brand-500'>Temples</span>{' '}
          Worldwide
        </Typography>
        <Typography
          variant='body-1'
          className='leading-7 text-md text-gray-200 font-light text-left'
        >
          Explore sacred spaces from every corner of the
          world, right from your screen. Share the unique
          story of your temple, traditions, and festivals.
          Join a growing community of devotees, seekers, and
          culture lovers. Celebrate heritage, build
          spiritual connections, and pass on legacies that
          matter.
        </Typography>
        <div className='flex gap-10'>
          <Button className='relative w-full md:w-auto group overflow-hidden bg-brand-500 px-5 py-3 text-white'>
            <span className='relative z-10'>
              Explore More
            </span>
            <span className='absolute left-0 top-0 h-full w-0 bg-brand-600 z-0 group-hover:w-full transition-all duration-500'></span>
          </Button>
        </div>
      </motion.div>
      <div className='banner__video z-50'>
        <a
          href='https://www.youtube.com/watch?v=XHOmBV4js_E'
          className='popup-video'
        >
          <i className='fi fi-sr-play'></i>
        </a>
      </div>

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className='w-full md:w-1/2 z-10'
      >
        <div className='grid grid-rows-3 grid-cols-1 md:grid-rows-6 md:grid-cols-6 gap-4 p-5 md:gap-10 md:p-10 h-[700px] sm:h-[1000px] md:h-full w-full'>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={Temple1}
            alt='Image 1'
            className='
      md:row-start-2 md:row-end-6 md:col-start-1 md:col-end-4
      w-full h-full object-cover rounded-2xl shadow-lg
      hover:scale-105 transition-transform duration-300 row-start-1 row-end-2 col-start-1 col-end-1'
          />

          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={Temple3}
            alt='Image 2'
            className='
      md:row-start-1 md:row-end-4 md:col-start-4 md:col-end-7
      w-full h-full object-cover rounded-2xl shadow-lg
      hover:scale-105 transition-transform duration-300 row-start-2 row-end-3 col-start-1 col-end-1'
          />

          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            src={Temple2}
            alt='Image 3'
            className='
      md:row-start-4 md:row-end-7 md:col-start-4 md:col-end-7
      w-full h-full  object-cover rounded-2xl shadow-lg
      hover:scale-105 transition-transform duration-300 row-start-3 row-end-4 col-start-1 col-end-1'
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
