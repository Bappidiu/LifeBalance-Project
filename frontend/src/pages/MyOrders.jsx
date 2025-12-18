import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {

    const { backendUrl, token, currencySymbol } = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const loadOrders = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/order/user-orders', { headers: { token } })
            if (data.success) {
                setOrders(data.orders.reverse())
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelOrder = async (orderId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                loadOrders()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadOrders()
        }
    }, [token])

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Orders</p>
            <div>
                {orders.map((item, index) => (
                    <div className='grid grid-cols-[1fr,2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                        <div className='w-32 bg-indigo-50'>
                             <img className='w-full h-full object-cover' src={item.itemData.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral font-semibold text-lg'>{item.itemData.name}</p>
                            <p className='text-zinc-600'>{item.itemData.category}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Price: {currencySymbol}{item.amount}</p>
                            <p className='text-sm mt-1'>Date: {new Date(item.date).toDateString()}</p>
                            <p className='mt-2'>Status: <span className={item.status === 'Order Placed' ? 'text-green-500' : 'text-gray-500'}>{item.status}</span></p>
                        </div>
                        
                        <div className='flex flex-col gap-2 justify-end'>
                            {item.status !== 'Cancelled' && !item.payment && (
                                <button onClick={() => navigate(`/payment-order/${item._id}`)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition duration-300'>Pay Online</button>
                            )}
                            {item.status !== 'Cancelled' && !item.payment && (
                                <button onClick={() => cancelOrder(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition duration-300'>Cancel Order</button>
                            )}
                            {item.status === 'Cancelled' && (
                                <button className='text-sm text-red-500 border border-red-500 rounded py-2 px-4 cursor-not-allowed'>Cancelled</button>
                            )}
                             {item.payment && (
                                <button className='text-sm text-green-500 border border-green-500 rounded py-2 px-4 cursor-not-allowed'>Paid</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders