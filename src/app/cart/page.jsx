'use client'

import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/cart';
import Link from 'next/link';

export default function Cart() {
let [loading, setLoading] = useState(true);
  let { getUserCart, clearItems, deleteItem, setnumsCartItems, updateCartItem } = useContext(CartContext);
  let [catData, setcartData] = useState(null);

  useEffect(() => {
    getCartData();
  }, []);

  function getCartData() {
    getUserCart().then((req) => {
      console.log(req.data);
      setcartData(req.data.data);
      setLoading(false)
    });
  }

  function deleteCartItem(id) {
    deleteItem(id).then((req) => {
      setnumsCartItems(req.data.numOfCartItems);
      setcartData(req.data.data);
    });
  }

  function clearCartItems() {
    clearItems().then((req) => {
      if (req.data.message === 'success') {
        setnumsCartItems(0);
        setcartData(null);
      }
    });
  }

  function updateCart(id, count) {

    updateCartItem(id, count).then((req) => {
      setcartData(req.data.data);
    });
  }

  return (

    <>
        {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <span className="loader"></span>
        </div>
      ) : <>
    
      {catData && catData.products && catData.products.length > 0 ? (
        <div className='w-10/12 mx-auto p-6 my-16 bg-gray-100 rounded-lg shadow-md'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-2xl  my-5 font-bold'>Cart Shop</h1>
              <h5 className=' font-semibold text-lg'>total price:  <span className='text-green-400'>{catData.totalCartPrice}</span> </h5>
            </div>
            <div className='flex flex-col start-1'>
              <Link href={`/cart/${catData._id}`} className='text-white text-center border rounded-md my-5 bg-blue-500 border-blue-500  px-5 py-3  hover:bg-blue-600 hover:text-white transition'>check out</Link>
              <h5 className='text-black font-semibold text-lg'>total number of items:<span className='text-green-400'>{catData.numOfCartItems}</span></h5>
            </div>

          </div>

          {catData.products.map((item) => (
            <div key={item._id} className='flex justify-between items-center mt-4 border-b border-gray-300 pb-1'>
              <div className='flex items-center w-9/12 '>
                <div className='w-2/12'>
                  <img src={item.product.imageCover} alt="product" className='w-full rounded-md' />
                </div>
                <div className='w-9/12 pl-4'>
                  <h2 className='text-lg font-semibold'>{item.product.title}</h2>
                  <h4 className='text-black'> {item.price} EGP</h4>
                  <button onClick={() => deleteCartItem(item.product._id)} className='text-red-500 hover:text-red-700 mt-2 flex items-center'>
                    <i className="fa-solid fa-trash-can mr-1"></i> Remove
                  </button>
                </div>
              </div>
              <div className='flex items-center'>
                <button onClick={() => updateCart(item.product._id, item.count + 1)} className='border border-green-400 rounded px-3 py-1 hover:bg-gray-200'>+</button>
                <span className='mx-4 text-lg font-semibold'>{item.count}</span>
                <button onClick={() => updateCart(item.product._id, item.count - 1)} className='border border-green-400 rounded px-3 py-1 hover:bg-gray-200'>-</button>
              </div>
            </div>
          ))}
          <div className='flex justify-center my-4'>
            <button onClick={clearCartItems} className='text-black border border-green-500 rounded-md px-5  py-3 text-xl transition'>Clear Your Cart</button>
          </div>

        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <span className="loader"></span>
        </div>
      )}
    </>}
    </>
  );
}

