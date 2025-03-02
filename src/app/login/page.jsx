'use client'
import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'
import Link from 'next/link';
import { AuthContext } from '../../context/Auth';


export default function Login() {
  let { setToken } = useContext(AuthContext);
  const baseUrl = "https://ecommerce.routemisr.com";
  const router = useRouter();
  let [errorMassage, setError] = useState(null);
  let validYup = Yup.object({
    email: Yup.string().required("email Required ").email(),
    password: Yup.string().required("password Required ").matches(/^(?=.*[a-z])(?=.*\d).{8,}$/),
  });
  let LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: LoginApi,
    validationSchema: validYup,

  });

  async function LoginApi(data) {
    await axios.post(`${baseUrl}/api/v1/auth/signin`, data).then((req) => {

      if (typeof window !== "undefined") {
        if (req.data.message == "success") {

          localStorage.setItem("token", req.data.token)
          setToken(req.data.token)
          router.push('/')

        }
      }

    }).catch((err) => {

      setError(err.response.data.message);
    })

  }
  return (

    <div className='mt-11'>
      {errorMassage ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert" >
        {errorMassage}</div> : ""}

      <h2 className='w-10/12 mx-auto  text-3xl  my-5'>Login now</h2>
      <form onSubmit={LoginForm.handleSubmit} className="w-10/12 mx-auto mt-11 ">

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input value={LoginForm.values.email} onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-bg-green-600 focus:border-green-bg-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-bg-green-600 dark:focus:border-green-bg-green-600" />
          {LoginForm.errors.email && LoginForm.touched.email ? <p className='text-red-800'> {LoginForm.errors.email} </p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
          <input value={LoginForm.values.password} onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-bg-green-600 focus:border-green-bg-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {LoginForm.errors.password && LoginForm.touched.password ? <p className='text-red-800'> {LoginForm.errors.password} </p> : ""}
        </div>

        <div>
          <Link href="/forgetPassword" className="text-xl text-gray-950 my-2 w-10/12 mx-auto ">
            Forget Password ..?
          </Link>
        </div>

        <button disabled={!(LoginForm.isValid && LoginForm.dirty)}
          type="submit" className="text-white  bg-green-600 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-bg-green-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-bg-green-600  disabled:bg-green-600 me-auto disabled:bg-opacity-25"> Login Now</button>




      </form>






    </div>



  )
}
