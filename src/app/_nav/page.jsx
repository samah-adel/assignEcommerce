'use client'
import React, { useContext } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { AuthContext } from '../../context/Auth';
import { CartContext } from '@/context/cart';


export default function Navbar() {

    let { numsCartItems } = useContext(CartContext);

    let { token, setToken } = useContext(AuthContext);

    function logout() {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            setToken(null);
            redirect('/login')
        }
    }

    return (<>
        <div className='bg-gray-100'>
            <nav className="w-11/12 mx-auto border-gray-100 py-2  dark:bg-gray-900">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

                    <Link href="/" className="flex items-center space-x-3">
                        <span className="self-center text-2xl  whitespace-nowrap dark:text-white">
                            <i className="fa-solid fa-cart-shopping text-2xl text-green-600"></i> fresh cart
                        </span>
                    </Link>


                    <div className="flex md:hidden">
                        <button
                            data-collapse-toggle="navbar-cta"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>


                    <div className="hidden md:flex w-full justify-between items-center">


                        {token ? (
                            <>
                                <ul className="flex-1 flex justify-center  p-1 md:p-0 border border-gray-100 rounded-lg md:space-x-4 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li><Link href="/" className="py-2 px-1 text-gray-600 hover:text-gray-900">Home</Link></li>
                                    <li><Link href="/cart" className="py-2 px-1 text-gray-600 hover:text-gray-900">Cart</Link></li>
                                    <li><Link href="/wishList" className="py-2 px-1 text-gray-600 hover:text-gray-900">Wish List</Link></li>
                                    <li><Link href="/products" className="py-2 px-1 text-gray-600 hover:text-gray-900">Products</Link></li>
                                    <li><Link href="/categories" className="py-2 px-1 text-gray-600 hover:text-gray-900">Categories</Link></li>
                                    <li><Link href="/brands" className="py-2 px-1 text-gray-600 hover:text-gray-900">Brands</Link></li>
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul className="flex-1 flex justify-end  p-1 md:p-0 border border-gray-100 rounded-lg md:space-x-4 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li><Link href="/signup" className="py-2 px-1 text-gray-900 hover:text-blue-700">register</Link></li>
                                    <li><Link href="/login" className="py-2 px-1 text-gray-900 hover:text-blue-700">login</Link></li>
                                </ul>
                            </>
                        )}


                        {/* أيقونة السلة وزر تسجيل الخروج */}
                        {token && (
                            <div className="flex items-center space-x-6">
                                <Link href="/cart" className='relative'>
                                    <i className="fa-solid fa-cart-shopping text-3xl"></i>
                                    <span className='absolute top-0 end-0 translate-x-3 -translate-y-4 px-2 bg-green-600 border rounded-md text-white ' > {numsCartItems}</span>
                                </Link>
                                <span onClick={logout} className="text-xl cursor-pointer whitespace-nowrap">log out</span>
                            </div>
                        )}
                    </div>
                </div>
            </nav >
        </div >

    </>
    );

}
