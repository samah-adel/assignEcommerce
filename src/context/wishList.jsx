'use client'
import axios from 'axios';
import React, { createContext } from 'react';


export let WishListContext = createContext();
export default function WishListProvider({ children }) {

    const baseUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';
    if (typeof window !== "undefined") {
        const headersOption = {
            headers: {
                token: localStorage.getItem("token"),
            },
        };
    }
    function addUserList(id) {
        let data = {
            productId: id,
        }
        return axios.post(baseUrl, data, headersOption);

    }
    function getUserList() {
        return axios.get(baseUrl, headersOption)

    }

    function deleteItem(id) {
        return axios.delete(`${baseUrl}/${id}`, headersOption)

    }
    return (
        <WishListContext.Provider value={{ deleteItem, getUserList, addUserList }}>
            {children}
        </WishListContext.Provider>
    )
}
