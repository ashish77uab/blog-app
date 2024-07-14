"use client";
import React from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const ToastProvider = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer
                className={
                    "lg:w-[500px] text-16 font-semibold w-[320px] p-0 !font-poppins"
                }
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                limit={3}
            />
        </>
    )
}

export default ToastProvider

