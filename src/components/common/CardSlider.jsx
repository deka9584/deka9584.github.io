import { Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';

function CardSlider ({ children, className = "", loop = false }) {
    const cards = Children.toArray(children);
    
    return (
        <Swiper
            modules={[Pagination]}
            pagination={{
                clickable: true,
                bulletClass: "inline-block size-md rounded-full border border-lightBlue",
                bulletActiveClass: "bg-lightBlue",
                clickableClass: "flex justify-center gap-md mt-xl",
                lockClass: "hidden",
            }}
            className={className}
            slidesPerView={1}
            spaceBetween={50}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }}
            centerInsufficientSlides
            loop={loop}
        >
            {cards.map((item, index) => (
                <SwiperSlide key={index} style={{ height: "auto" }}>
                    {item}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CardSlider;