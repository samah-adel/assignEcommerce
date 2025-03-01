'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';

export default function Brands() {
    let [BrandsList, setBrands] = useState([]);
    let [loading, setLoading] = useState(true);
    let [selectedBrand, setSelectedBrand] = useState(null);

    function getAllCategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((req) => {
            setBrands(req.data.data);
            setLoading(false);
        })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    function handleBrandClick(brand) {
        setSelectedBrand(brand);
    }

    function closeModal() {
        setSelectedBrand(null);
    }

    return (<>
        {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <span className="loader"></span>
            </div>
        ) : <>
            <div className="w-10/12 mx-auto my-5">
                <h1 className='text-green-600 text-center text-5xl my-6'>All Brands</h1>
                <div className="flex flex-wrap">
                    {BrandsList?.map((brand) => {
                        let { _id, name, image } = brand;
                        return (
                            <div key={_id} className="md:w-3/12 sm:w-6/12 w-full px-3 mb-3">
                                <div
                                    className="item group hover:border overflow-hidden flex flex-col items-center justify-center cursor-pointer border hover:shadow-md hover:shadow-gray-500"
                                    onClick={() => handleBrandClick(brand)}
                                >
                                    <div className="w-full h-full aspect-video m-3 flex items-center justify-center overflow-hidden">
                                        <Image className="w-full h-full object-cover" src={image} alt={name} width={500} height={500} />
                                    </div>
                                    <h4 className="text-gray-700 my-3 text-2xl text-center">{name}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedBrand && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative flex flex-col justify-center">
                        <button className="absolute top-2 right-2 text-xl" onClick={closeModal}>&times;</button>
                        <div className='flex flex-nowrap justify-between items-center'>
                            <h2 className=" w-6/12 text-green-600 text-6xl ">{selectedBrand.name}</h2>
                            <Image src={selectedBrand.image} alt={selectedBrand.name} width={200} height={200} className="mx-auto w-6/12" />
                        </div>
                        <button className="mt-4 ms-auto w-3/12 px-4 py-2 bg-gray-500 text-white rounded" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </>}</>);
}
