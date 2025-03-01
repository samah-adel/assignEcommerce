'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function ForgetPassword() {
  const router = useRouter();
  const [errorMessage, setError] = useState(null);
  const [formDisplay, setFormDisplay] = useState(true);
  const baseUrl = "https://ecommerce.routemisr.com";
  let validYup = Yup.object({
    email: Yup.string().required("email Required ").email(),
  });
  let valid2Yup = Yup.object({
    resetCode: Yup.string().required("email resetCode"),
  });
  let ForgetForm = useFormik({
    initialValues: {
      email: "",

    },
    onSubmit: ForgetApi,
    validationSchema: validYup,


  });

  let verifyResetCodeForm = useFormik({
    initialValues: {
      resetCode: "",

    },
    onSubmit: verifyResetCodeApi,
    validationSchema: valid2Yup,


  });

  async function ForgetApi(data) {
    await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, data).then((req) => {

      console.log(req);
      if (req.data.statusMsg == 'success') {
        setFormDisplay(false);
      };
    }).catch((err) => {
      setError(err.response.data.message);
      console.log(err);
    })

  }
  async function verifyResetCodeApi(data) {
    await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, data).then((req) => {

      console.log(req);

      if (req.data.status === "Success") {
        router.push('/updatePassword');

      }
    }).catch((err) => {
      setError(err.response.data.message);
      console.log(err);
    })

  }

  return (<>
    {formDisplay ?
      <div>
        {errorMessage ? <div class="w-7/12 mx-auto my-2 text-base text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorMessage}</div> : ""}
        <h2 className='w-7/12 mx-auto my-5 text-3xl'>please enter your verification code</h2>
        <form onSubmit={ForgetForm.handleSubmit} className="w-7/12 mx-auto">

          <div className="mb-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
            <input value={ForgetForm.values.email}
              onChange={ForgetForm.handleChange}
              onBlur={ForgetForm.handleBlur}
              type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-bg-green-600 focus:border-green-bg-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-bg-green-600 dark:focus:border-green-bg-green-600" />
            {ForgetForm.errors.email && ForgetForm.touched.email ? <p className='text-red-800'> {ForgetForm.errors.email} </p> : ""}
          </div>



          <button
            disabled={!(ForgetForm.isValid && ForgetForm.dirty)}
            type="submit" className="text-white bg-green-600 hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active ms-auto disabled:bg-active disabled:bg-opacity-25">verify</button>
        </form>
      </div>
      : <div>
        {errorMessage ? <div class="w-7/12 mx-auto my-2 text-base text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errorMessage}</div> : ""}
        <h2 className='w-7/12 mx-auto my-5 text-2xl'>reset your account password</h2>
        <form onSubmit={verifyResetCodeForm.handleSubmit} className="w-7/12 mx-auto">


          <div className="mb-3">
            <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">resetCode:</label>
            <input value={verifyResetCodeForm.values.resetCode}
              onChange={verifyResetCodeForm.handleChange}
              onBlur={verifyResetCodeForm.handleBlur}
              type="string" name='resetCode' id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
            {verifyResetCodeForm.errors.resetCode && verifyResetCodeForm.touched.resetCode ? <p className='text-red-800'> {verifyResetCodeForm.errors.resetCode} </p> : ""}
          </div>


          <button
            disabled={!(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)}
            type="submit" className="text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-bg-green-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-bg-green-600 ms-auto disabled:bg-green-600 disabled:bg-opacity-25">verify</button>
        </form>
      </div>}

  </>)
}










