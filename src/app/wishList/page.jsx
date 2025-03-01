'use client'
import { WishListContext } from '@/context/wishList';
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '@/context/cart';


export default function WishList() {
  const [ListData, setListData] = useState(null);
  const { getUserList, deleteItem } = useContext(WishListContext);
  const { setnumsCartItems, addUserCart } = useContext(CartContext);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  function getList() {
    getUserList()
      .then((res) => {
        setListData(res.data.data);
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      });
  }

  function deleteListItem(id) {
    deleteItem(id)
      .then((req) => {
        // setListData((prevList) => prevList.filter(item => item._id !== id));
        setListData(req.data.data);

      })

  }

  function addCart(id) {
    addUserCart(id)
      .then((res) => {
        setnumsCartItems(res.data.numOfCartItems);

      })

  }

  return (<>
    {loading ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <span className="loader"></span>
      </div>
    ) : <>
      <div className="container mx-auto bg-gray-100 my-11 p-4">
        <h2 className="text-2xl mb-4">My Wish List</h2>
        <div className="space-y-4">
          {ListData.length > 0 ? (
            ListData.map((item) => (
              <div key={item._id} className="flex justify-between items-center p-8  border-b border-gray-300 pb-1 ">
                <div className="flex items-center">
                  <img src={item.imageCover} alt={item.title} className="w-20 h-20 rounded" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-green-600">Price: {item.price} EGP</p>
                    <button
                      onClick={() => deleteListItem(item._id)}
                      className="text-red-500 hover:text-red-700 mr-4"
                    >
                      <i className="fa-solid fa-trash-can mr-1"></i>
                      Remove
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => addCart(item._id)}
                  className="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            ""
          )}
        </div>
      </div>
    </>}</>
  );
}
