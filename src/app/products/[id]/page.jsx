'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useContext } from 'react';
import { CartContext } from "../../../context/cart";

export default function ProductDetails({ params }) {
    if (!params || !params.id) {
        return <div className="text-center mt-10 text-red-500">حدث خطأ، لم يتم العثور على المنتج</div>;
    }
    let { setnumsCartItems, addUserCart } = useContext(CartContext)
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    async function getProductDetails() {

        await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((req) => {
            setProduct(req.data.data);
            setLoading(false)
        }).catch((error) => {
            console.error("Error fetching product:", error);
            setLoading(false)
        })
    };
    useEffect(() => {

        getProductDetails();
    }, [id]);


    function addCart(id) {

        addUserCart(id).then((req) => {
            setnumsCartItems(req.data.numOfCartItems);
            console.log(req.data.message);
            toast.success(req.data.message)


        }).catch((err) => {
            toast.error(err.resonce.data.error)

        })

    }


    return (<>
        {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <span className="loader"></span>
            </div>
          ) : <>
        <div className='w-10/12 mx-auto mb-40 mt-20'>
            <div className='flex items-center bg-white p-8 '>
                <div className='w-4/12'>
                    <Slider dots>
                        {product.images?.map((image, i) => (
                            <div key={i}>
                                <Image src={image} alt={`Product Image ${i + 1}`} className='w-full rounded-lg' width={200} height={200} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className='w-8/12 px-8'>
                    <h2 className='text-2xl font-bold mb-4'>{product.title}</h2>
                    <p className='text-gray-700 mb-4'>{product.description}</p>
                    <h4 className='text-lg font-semibold mb-2'>{product.category?.name}</h4>

                    <div className='flex justify-between items-center mb-4'>
                        <span className='text-xl font-bold'>{product.price} EGP</span>
                        <span className='flex items-center'>
                            <i className='text-yellow-500 fa-solid fa-star mr-1'></i>{product.ratingsAverage}
                        </span>
                    </div>
                    <button onClick={() => {
                        addCart(id)

                    }} className='bg-green-500 text-white text-lg font-semibold rounded-lg px-6 py-2 w-full hover:bg-green-600 transition duration-300'>
                        + Add
                    </button>
                </div>
            </div>
        </div></>}
   </> );
}
