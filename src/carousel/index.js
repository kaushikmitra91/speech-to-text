import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 300 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  }
};
const sliderImageUrl = [
  //First image url
  {
    url:
      "https://picsum.photos/id/11/300/300"
  },
  {
    url:
      "https://picsum.photos/id/12/300/300"
  },
  //Second image url
  {
    url:
      "https://picsum.photos/id/16/300/300"
  },
  //Third image url
  {
    url:
      "https://picsum.photos/id/49/300/300"
  },

  //Fourth image url

  {
    url:
      "https://picsum.photos/id/96/300/300"
  }
];
const Slider = () => {
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        infinite={true}
        centerMode={true}
        removeArrowOnDeviceType={["tablet", "mobile",'desktop']}
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <div className="slider" key={index}>
              <img src={imageUrl.url} alt="movie" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Slider;
