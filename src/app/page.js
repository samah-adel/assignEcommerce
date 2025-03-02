'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import MianSlider from './_mainslider/page';
import CategorySlider from './_categoryslider/page';
import { useContext } from 'react';
import { CartContext } from '@/context/cart';
import { WishListContext } from '@/context/wishList';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  let [productList, setProduct] = useState([]);
  let [filteredProducts, setFilteredProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [searchTerm, setSearchTerm] = useState("");
  let [favoriteProducts, setFavoriteProducts] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("token");
      if (!user) {
        router.push("/signup");
      }
    }
  }, []);

  function getAllProduct() {
    setLoading(true);
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((req) => {
      setProduct(req.data.data);
      setFilteredProducts(req.data.data);
      setLoading(false);
    })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllProduct();

  }, []);

  useEffect(() => {
    let filtered = productList.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, productList]);

  let { setnumsCartItems, addUserCart } = useContext(CartContext)
  function addCart(id) {

    addUserCart(id).then((req) => {
      setnumsCartItems(req.data.numOfCartItems);
      console.log(req.data.message);
      toast.success(req.data.message)


    }).catch((err) => {
      toast.error(err.resonce.data.error)

    })

  }
  let { addUserList } = useContext(WishListContext)
  function addList(id) {

    addUserList(id).then((req) => {

      console.log(req.data.message);
      toast.success(req.data.message)
      setFavoriteProducts((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));


    }).catch((err) => {
      toast.error(err.resonce.data.error)

    })

  }

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <span className="loader"></span>
        </div>
      ) : <>

        <Toaster />
        <MianSlider />
        <CategorySlider />

        <form className="max-w-5xl mx-auto">
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className='w-10/12 mx-auto my-5'>
          <div className='flex flex-wrap'>
            {filteredProducts.map((product) => {
              let { _id, title, imageCover, price, category, ratingsAverage } = product;
              let { name } = category;
              return (
                <div key={_id} className='lg:w-3/12 md:w-3/12 sm:w-6/12 w-full group px-3 mb-3 hover:shadow-md hover:shadow-green-500 '>
                  <div className='item p-5 hover:border overflow-hidden '>
                    <Link href={`/products/${_id}`}>
                      <img src={imageCover} alt={title} />
                      <h4 className='text-green-bg-green-600'>{title.split(" ").slice(0, 2).join(" ")}</h4>
                      <h2 className='text-lg'>{name}</h2>
                      <div className='flex justify-between'>
                        <span>{price} EGP</span>
                        <span><i className='text-yellow-500 fa-solid fa-star'></i> {ratingsAverage}</span>
                      </div>

                    </Link>
                    <div className='flex justify-between my-2 space-x-3'>
                      <button onClick={() => { addCart(_id) }} className='bg-green-600 text-white rounded mx-auto my-2 p-1 w-9/12 duration-500 hover:bg-green-600 translate-y-28 group-hover:translate-y-0'>+ Add</button>
                      <button className='w-3/12 text-2xl' onClick={() => {
                        addList(_id)
                      }}>
                        <i className={`fa-solid fa-heart h-3 ${favoriteProducts[_id] ? 'text-red-500' : ''}`}></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div> </>}
    </>
  );
}
