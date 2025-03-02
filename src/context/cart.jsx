'use client'
import axios from 'axios';
import React, { createContext } from 'react';
import { useState, useEffect } from 'react';

export let CartContext = createContext();

export default function CartContextProvider({ children }) {

    let [numsCartItems, setnumsCartItems] = useState(null);
    const baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart';
    if (typeof window !== "undefined") {
        const headersOption = {
            headers: {
                token: localStorage.getItem("token"),
            },
        };
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("token")) {
                getUserCart().then((req) => {
                    setnumsCartItems(req.data.numOfCartItems)
                })
            }
        }
    }, []);

    function updateCartItem(id, count) {
        let data = {
            count: count,
        };
        return axios.put(`${baseUrl}/${id}`, data, headersOption)

    }


    function deleteItem(id) {
        return axios.delete(`${baseUrl}/${id}`, headersOption)

    }

    function clearItems() {
        return axios.delete(`${baseUrl}`, headersOption)

    }

    function addUserCart(id) {
        let data = {
            productId: id,
        }
        return axios.post(baseUrl, data, headersOption);

    }

    function getUserCart() {
        return axios.get(baseUrl, headersOption)

    }

    return (
        <CartContext.Provider value={{ getUserCart, numsCartItems, setnumsCartItems, addUserCart, deleteItem, clearItems, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
}
