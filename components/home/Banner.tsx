"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerItem {
  img: string;
}

const Banner = (props: { BannerItems: BannerItem[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50} // 轮播图间距
      slidesPerView={1} // 每次显示 1 张图
      pagination={{ clickable: true }} // 分页指示点
      autoplay={{ delay: 3000 }} // 自动播放，每 3 秒切换
      loop={true} // 无限循环
      className="w-full h-60"
    >
      {props.BannerItems.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <img className="w-full h-full" src={item.img}></img>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default Banner;
