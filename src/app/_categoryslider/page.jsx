
 import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import Slider from 'react-slick';
import Image from 'next/image';

export default function CategorySlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 50,
        slidesToShow: 7,
        slidesToScroll: 1,
    };
    let [categoryList, setcategoryList] = useState(null);
    function getApiSlider() {
        axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((req) => {
            setcategoryList(req.data.data)
        }).catch((err) => {
            console.log(err);

        })

    }
    useEffect(() => {

        getApiSlider()
    }, []);
    return (
        <>
            <div className='my-10'>
                <h2>Shop Polpular Categories</h2>
                <Slider {...settings}>
                    {categoryList?.map((cat) => {
                        return (
                            <div className='w-80 h-72'  key={cat._id}>
                               <Image src={cat.image} alt="" className='w-full h-full'  width={800} height={800}/>
                                <h5>{cat.name}</h5>

                            </div>
                        )
                    })}
                </Slider>

            </div >
        </>
    )
}
