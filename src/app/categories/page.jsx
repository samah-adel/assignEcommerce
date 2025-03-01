'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

export default function Category() {
    let [categoryList, setCategory] = useState([]);
    let [subCategories, setSubCategories] = useState([]);
    let [loading, setLoading] = useState(true);
    let [selectedCategory, setSelectedCategory] = useState(null);

    function getAllCategories() {
        setLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((req) => {
            setCategory(req.data.data);
            setLoading(false);
        })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    function getSubCategories(categoryId) {
        setLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`).then((req) => {
            setSubCategories(req.data.data);
            setSelectedCategory(categoryId);
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

    return (
        <>
         {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <span className="loader"></span>
        </div>
      ) : <>
            <div className="w-10/12 mx-auto my-5">
                <div className="flex flex-wrap">
                    {categoryList?.map((cat) => {
                        let { _id, name, image } = cat;
                        return (
                            <div key={_id} className="lg:w-4/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3 hover:shadow-md hover:shadow-green-500 ">
                                <div className="item group  overflow-hidden flex flex-col items-center justify-center cursor-pointer"
                                    onClick={() => getSubCategories(_id)}>

                                    <div className="w-full h-full aspect-video m-3 flex items-center justify-center overflow-hidden">
                                        <Image className="w-full h-full object-cover" src={image} alt={name} width={500} height={500} />
                                    </div>
                                    <h4 className="text-green-700 my-3 text-2xl text-center">{name}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {selectedCategory && (
                <div className="mt-5n ">
                    <h2 className="text-green-700 text-2xl  text-center  ">Subcategories</h2>
                    <div className="flex flex-wrap justify-center mt-3">
                        {subCategories?.map((sub, i) => (
                            <div key={i} className="w-3/12  border hover:border hover:shadow-md hover:shadow-gray-500  text-3xl m-8 p-8 rounded-md shadow-md text-center">
                                {sub.name}
                            </div>))}
                        
                    </div>
                </div>
            )}</>}
        </>
    );
}