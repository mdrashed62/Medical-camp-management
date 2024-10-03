
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide';
import img1 from '../../../assets/medical_camp2.jpg'
import img2 from '../../../assets/Medical-Camp4.jpeg'
import img3 from '../../../assets/medical_camp3.jpg'
import img4 from '../../../assets/Medical-camp1.jpg'



export default function Banner () {
  return (
    <div className='container  py-10 mx-auto '>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay:2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={img1}
            // text={<>Crafting Extraordinary Events for <br />Extraordinary People</>}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={img2}
            // text={
            // <>
            //     Bringing Your Ideas to Life The Ultimate <br /> Event Management Experience
            // </>}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={img3}
            // text={<>Creating Spectacular Moments, <br />One Event at a Time</>}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={img4}
            // text={<>From Start to Finish Comprehensive <br />Event Management for Every Need</>}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}