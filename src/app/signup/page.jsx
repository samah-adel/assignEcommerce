'use client'
import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function Signup() {
    const baseUrl = "https://ecommerce.routemisr.com";
    const router = useRouter();
    let [errorMassage, setError] = useState(null);
    let validYup = Yup.object({
        name: Yup.string().required("name Required ").min(3, "min 3 latters").max(20, "max 20 latters"),
        email: Yup.string().required("email Required ").email(),
        password: Yup.string().required("password Required ").matches(/^(?=.*[a-z])(?=.*\d).{8,}$/),
        rePassword: Yup.string().required("rePassword required ").oneOf([Yup.ref("password")]),
        phone: Yup.string().required("phone required ").matches(/^(010|011|012|015)\d{8}$/),

    });
    let RegisterForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },

        onSubmit: RegisterApi,
        validationSchema: validYup,
    });

    async function RegisterApi(data) {
        await axios.post(`${baseUrl}/api/v1/auth/signup`, data).then((req) => {

            if (req.data.message == "success") {
                router.push('/login')

            }


        }).catch((err) => {

            setError(err.response.data.message);
        })

    }
    return (

        <div className='mt-11'>
            {errorMassage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" >
                {errorMassage}</div> : ""}

            <h2 className='w-10/12 mx-auto  text-3xl  my-5'>register now</h2>
            <form onSubmit={RegisterForm.handleSubmit} className="w-10/12 mx-auto mt-11 ">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                    <input value={RegisterForm.values.name}
                        onChange={RegisterForm.handleChange}
                        onBlur={RegisterForm.handleBlur}
                        type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-bg-green-600 focus:border-green-bg-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-bg-green-600 dark:focus:border-green-bg-green-600" />
                    {RegisterForm.errors.name && RegisterForm.touched.name ? <p className='text-red-800'> {RegisterForm.errors.name} </p> : ""}
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                    <input value={RegisterForm.values.email} onChange={RegisterForm.handleChange}
                        onBlur={RegisterForm.handleBlur}
                        type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-bg-green-600 focus:border-green-bg-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-bg-green-600 dark:focus:border-green-bg-green-600" />
                    {RegisterForm.errors.email && RegisterForm.touched.email ? <p className='text-red-800'> {RegisterForm.errors.email} </p> : ""}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                    <input value={RegisterForm.values.password} onChange={RegisterForm.handleChange}
                        onBlur={RegisterForm.handleBlur}
                        type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-bg-green-600 focus:border-green-bg-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    {RegisterForm.errors.password && RegisterForm.touched.password ? <p className='text-red-800'> {RegisterForm.errors.password} </p> : ""}
                </div>
                <div className="mb-5">
                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-password:</label>
                    <input value={RegisterForm.values.rePassword} onChange={RegisterForm.handleChange}
                        onBlur={RegisterForm.handleBlur}
                        type="password" name='rePassword' id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    {RegisterForm.errors.rePassword && RegisterForm.touched.rePassword ? <p className='text-red-800'> {RegisterForm.errors.rePassword} </p> : ""}
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
                    <input value={RegisterForm.values.phone} onChange={RegisterForm.handleChange}
                        onBlur={RegisterForm.handleBlur}
                        type="tel"
                        id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                    {RegisterForm.errors.phone && RegisterForm.touched.phone ? <p className='text-red-800'> {RegisterForm.errors.phone} </p> : ""}
                </div>


                <button disabled={!(RegisterForm.isValid && RegisterForm.dirty)}
                    type="submit" className="text-white  bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-bg-green-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-bg-green-600  disabled:bg-green-600 me-auto disabled:bg-opacity-25"> Register Now</button>
            </form>
        </div>



    )
}




