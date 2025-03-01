'use client'
import React from "react";
import Slider from "react-slick";
import imgSlider1 from "../../../public/slider1_.jpg";
import imgSlider2 from "../../../public/slider2_.jpg";
import imgSlider3 from "../../../public/slider3_.jpg";
import side1 from "../../../public/side1_.jpg";
import side2 from "../../../public/side2.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

export default function MainSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,

    };

    return (
        <div className=" mt-24 flex w-6/12 mx-auto flex-col md:flex-row justify-center items-center ">

            <div className="w-full md:w-7/12 mx-auto   g-0">
                <Slider {...settings}>
                    <div>
                        <Image className="w-full h-96" src={imgSlider3} alt="Slider 1" />
                    </div>
                    <div>
                        <Image className="w-full h-96" src={imgSlider2} alt="Slider 2" />
                    </div>
                    <div>
                        <Image className="w-full h-96" src={imgSlider1} alt="Slider 3" />
                    </div>
                </Slider>
            </div>


            <div className="w-full md:w-5/12 flex flex-col   g-0 ">
                <div>
                    <Image className="w-full h-48" src={side1} alt="Side Image 1" />
                </div>
                <div>
                    <Image className="w-full h-48" src={side2} alt="Side Image 2" />
                </div>
            </div>
        </div>
    );
}