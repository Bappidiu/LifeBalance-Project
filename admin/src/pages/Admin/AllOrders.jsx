import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const AllOrders = () => {

    const { backendUrl, aToken } = useContext(AdminContext)
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/order/list', { headers: { aToken } })
            if (data.success) {
                setOrders(data.orders.reverse())
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const statusHandler = async (orderId, status) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/order/status', { orderId, status }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                fetchOrders()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (aToken) fetchOrders()
    }, [aToken])

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>Order List</p>
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] grid-flow-col py-3 px-6 border-b'>
                    <p>#</p>
                    <p>User</p>
                    <p>Price</p>
                    <p>Medicine</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>
                {orders.map((item, index) => (
                    <div className='flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                            <p>{item.userData.name}</p>
                        </div>
                        <p>${item.amount}</p>
                        <p>{item.itemData.name}</p>
                        <p className={item.status === 'Completed' ? 'text-green-500' : 'text-gray-500'}>{item.status}</p>
                        <select onChange={(e) => statusHandler(item._id, e.target.value)} value={item.status} className='p-2 border rounded bg-gray-100'>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllOrders