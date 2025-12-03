import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets' // Ensure you have stripe/razorpay logos here
import { toast } from 'react-toastify'

const Payment = () => {
    const { appointmentId } = useParams()
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    // Mock Payment Function
    const handlePayment = () => {
        // In a real app, you would integrate Stripe/Razorpay SDK here.
        // For now, we simulate success after 2 seconds.
        toast.info("Redirecting to Payment Gateway...")
        
        setTimeout(() => {
            toast.success("Payment Successful!")
            navigate('/my-appoinments')
        }, 2000)
    }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 text-gray-800'>
        <div className='bg-white p-8 rounded-lg shadow-lg border w-96'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Choose Payment Method</h2>
            <div className='flex flex-col gap-4'>
                <div onClick={handlePayment} className='flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50'>
                    <img className='w-20' src={assets.stripe_logo} alt="Stripe" /> 
                </div>
                <div onClick={handlePayment} className='flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50'>
                    <img className='w-24' src={assets.razorpay_logo} alt="Razorpay" />
                </div>
                 <div onClick={handlePayment} className='flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50'>
                    <p className='font-bold text-gray-600 pl-2'>CASH ON ARRIVAL</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment