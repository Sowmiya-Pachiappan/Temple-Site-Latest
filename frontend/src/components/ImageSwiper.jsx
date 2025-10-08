import { Swiper, SwiperSlide } from 'swiper/react';
import {
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Image1 from '@/assets/images/slider-1.jpg';
import Image2 from '@/assets/images/slider-2.jpg';
import Image3 from '@/assets/images/slider-3.jpg';
import Image4 from '@/assets/images/slider-4.jpg';
import Image5 from '@/assets/images/slider-5.jpg';
import Image6 from '@/assets/images/slider-6.jpg';
import Image7 from '@/assets/images/slider-7.jpg';

const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
];

const ImageSwiper = () => {
  return (
    <div className='container'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className='swiper_container'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <motion.img
              src={image}
              alt={`slide_image_${index}`}
              className='w-full rounded-xl shadow-lg'
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2 * index,
              }}
            />
          </SwiperSlide>
        ))}

        <div className='slider-controler'>
          <div className='swiper-button-prev slider-arrow'>
            <ion-icon name='arrow-back-outline'></ion-icon>
          </div>
          <div className='swiper-button-next slider-arrow'>
            <ion-icon name='arrow-forward-outline'></ion-icon>
          </div>
          <div className='swiper-pagination'></div>
        </div>
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
