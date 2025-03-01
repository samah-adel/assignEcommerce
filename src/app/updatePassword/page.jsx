'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useRouter } from 'next/navigation'


export default function UpdatePassword() {
    const router = useRouter();
    let [errorMassage, setError] = useState(null);
    const baseUrl = "https://ecommerce.routemisr.com";
    let validYup = Yup.object({
        email: Yup.string().required("email Required ").email(),
        newPassword: Yup.string().required("password Required ").matches(/^(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/),
    });

    let UpDatePasswordForm = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        onSubmit: UpDatePasswordApi,
        validationSchema: validYup,


    });
    function UpDatePasswordApi(data) {
        axios.put(`${baseUrl}/api/v1/auth/resetPassword`, data).then((req) => {
            console.log(req)
            if (req.data.token) {
                router.push("/")
            }
        }).catch((err) => {
            setError(err.response.data.message);
            console.log(err);
        })

    }

    return (
        <div>
            {errorMassage ? <div class="w-7/12 mx-auto my-2 text-base text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errorMassage}</div> : ""}
            <h2 className='w-7/12 mx-auto mt-11 text-2xl'>reset your account password</h2>
            <form onSubmit={UpDatePasswordForm.handleSubmit} className="w-7/12 mx-auto">

                <div className="mb-3">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
                    <input value={UpDatePasswordForm.values.email}
                        onChange={UpDatePasswordForm.handleChange}
                        onBlur={UpDatePasswordForm.handleBlur}
                        type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-bg-green-600 focus:border-green-bg-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-bg-green-600 dark:focus:border-green-bg-green-600" />
                    {UpDatePasswordForm.errors.email && UpDatePasswordForm.touched.email ? <p className='text-red-800'> {UpDatePasswordForm.errors.email} </p> : ""}
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                    <input value={UpDatePasswordForm.values.newPassword}
                        onChange={UpDatePasswordForm.handleChange}
                        onBlur={UpDatePasswordForm.handleBlur}
                        type="password" name='newPassword' id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-bg-green-600 focus:border-green-bg-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-bg-green-600 dark:focus:border-green-bg-green-600" />
                    {UpDatePasswordForm.errors.newPassword && UpDatePasswordForm.touched.newPassword ? <p className='text-red-800'> {UpDatePasswordForm.errors.newPassword} </p> : ""}
                </div>


                <button
                    disabled={!(UpDatePasswordForm.isValid && UpDatePasswordForm.dirty)}
                    type="submit" className="text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-bg-green-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-bg-green-600 ms-auto disabled:bg-green-600 disabled:bg-opacity-25">reset password</button>
            </form>
        </div>



    )
}
