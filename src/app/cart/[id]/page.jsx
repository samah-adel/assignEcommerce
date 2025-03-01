'use client'
import React, { useState  } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

export default function CheckOut({ params }) {
    if (!params || !params.id) {
        return <div className="text-center mt-10 text-red-500">حدث خطأ</div>;
    }
    const { id } = params;
    let [errorMassage, setError] = useState(null);

    let validYup = Yup.object({
        details: Yup.string().required("Details Required "),
        phone: Yup.string().required("phone Required "),
        city: Yup.string().required("city Required "),
    });

    let CheckOutForm = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: CheckOutApi,
        validationSchema: validYup,
    });
    const headersOption = {
        headers: {
            token: localStorage.getItem("token")
        },
    };

    async function CheckOutApi(values) {
        const data = {
            shippingAddress: values,
        };

        await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/`,
            data, headersOption)
            .then((req) => {
                console.log(req.data);
                window.open(req.data.success.url);
            })
            .catch((err) => {
                setError(err.response?.data?.message);
            });
    }
   

    return (
        <div className='mt-11'>
            {errorMassage ? (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errorMassage}
                </div>
            ) : ""}

            <form onSubmit={CheckOutForm.handleSubmit} className="w-11/12 mx-auto mt-11">
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">details:</label>
                    <input
                        value={CheckOutForm.values.details}
                        onChange={CheckOutForm.handleChange}
                        onBlur={CheckOutForm.handleBlur}
                        type="text" name='details' id="details"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {CheckOutForm.errors.details && CheckOutForm.touched.details ? <p className='text-red-800'> {CheckOutForm.errors.details} </p> : ""}
                </div>

                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone:</label>
                    <input
                        value={CheckOutForm.values.phone}
                        onChange={CheckOutForm.handleChange}
                        onBlur={CheckOutForm.handleBlur}
                        type="tel" name='phone' id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {CheckOutForm.errors.phone && CheckOutForm.touched.phone ? <p className='text-red-800'> {CheckOutForm.errors.phone} </p> : ""}
                </div>

                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City:</label>
                    <input
                        value={CheckOutForm.values.city}
                        onChange={CheckOutForm.handleChange}
                        onBlur={CheckOutForm.handleBlur}
                        type="text" name='city' id="city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    {CheckOutForm.errors.city && CheckOutForm.touched.city ? <p className='text-red-800'> {CheckOutForm.errors.city} </p> : ""}
                </div>

                <button
                    disabled={!(CheckOutForm.isValid && CheckOutForm.dirty)}
                    type="submit"
                    className="text-white w-full bg-slate-200 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-300 disabled:bg-opacity-25"
                >
                    Pay
                </button>
            </form>
        </div>
    );
}


