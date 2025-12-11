import { Children, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function CardSlider ({ children, className = "", loop = false, pagination = false, navigation = false }) {
    const cards = Children.toArray(children);
    const swiperRef = useRef();

    const slideNextBtnHandler = () => {
        swiperRef.current?.slideNext();
    }
    
    const slidePrevBtnHandler = () => {
        swiperRef.current?.slidePrev();
    }
    
    return (
        <Swiper
            modules={[Pagination, Navigation]}
            pagination={{
                enabled: pagination,
                clickable: true,
                bulletClass: "inline-block size-md rounded-full border border-lightBlue",
                bulletActiveClass: "bg-lightBlue",
                clickableClass: "flex justify-center gap-md mt-xl",
                lockClass: "hidden",
            }}
            onSwiper={(swiper) => swiperRef.current = swiper }
            className={className}
            slidesPerView={1}
            spaceBetween={50}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }}
            centerInsufficientSlides
            loop={loop}
            maxBackfaceHiddenSlides={0}
        >
            {cards.map((item, index) => (
                <SwiperSlide key={index} style={{ height: "auto" }}>
                    {item}
                </SwiperSlide>
            ))}

            {navigation && (
                <div className="mt-lg flex justify-between items-center">
                    <button type="button" className="btn btn-outline-primary rounded-sm" onClick={slidePrevBtnHandler} aria-label="Previous">
                        <i className="bi bi-caret-left-fill"></i>
                    </button>
                    <button type="button" className="btn btn-outline-primary rounded-sm" onClick={slideNextBtnHandler} aria-label="Next">
                        <i className="bi bi-caret-right-fill"></i>
                    </button>
                </div>
            )}
        </Swiper>
    );
};

export default CardSlider;