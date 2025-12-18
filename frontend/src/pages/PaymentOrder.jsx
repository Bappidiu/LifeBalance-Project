import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import { toast } from 'react-toastify'

const PaymentOrder = () => {
    const { orderId } = useParams()
    const navigate = useNavigate()

    const handlePayment = () => {
        toast.info("Processing Payment...")
        setTimeout(() => {
            toast.success("Payment Successful!")
            navigate('/my-orders')
        }, 2000)
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-4 text-gray-800'>
            <div className='bg-white p-8 rounded-lg shadow-lg border w-96'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Pay for Order</h2>
                <div className='flex flex-col gap-4'>
                    <div onClick={handlePayment} className='flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50'>
                        <img className='w-20' src={assets.stripe_logo} alt="" />
                    </div>
                    <div onClick={handlePayment} className='flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50'>
                         <img className='w-24' src={assets.razorpay_logo} alt="" />
                    </div>
                    <div onClick={handlePayment} className='flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50'>
                        <p className='font-bold text-gray-600 pl-2'>CASH ON DELIVERY</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentOrder