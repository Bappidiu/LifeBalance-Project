import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MedicineDetails = () => {
    const { medId } = useParams()
    const { medicines, currencySymbol, token, backendUrl } = useContext(AppContext)
    const [medInfo, setMedInfo] = useState(null)
    const navigate = useNavigate()

    const fetchMedInfo = () => {
        const info = medicines.find(med => med._id === medId)
        setMedInfo(info)
    }

    // ... inside MedicineDetails component
    const placeOrder = async () => {
        if (!token) {
            toast.warn("Login to buy medicine")
            return navigate('/login')
        }
        try {
            // REMOVE 'userId: "auto"' and just send itemId
            const { data } = await axios.post(backendUrl + '/api/order/place', { itemId: medId }, { headers: { token } }) 
            
            if (data.success) {
                toast.success(data.message)
                navigate('/my-orders')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (medicines.length > 0) fetchMedInfo()
    }, [medicines, medId])

    return medInfo ? (
        <div className='flex flex-col sm:flex-row gap-4'>
            <div>
                <img className='bg-indigo-50 w-full sm:max-w-72 rounded-lg' src={medInfo.image} alt="" />
            </div>
            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
                <p className='text-2xl font-medium text-gray-900'>{medInfo.name}</p>
                <p className='text-gray-600 mt-2'>{medInfo.description}</p>
                <p className='text-gray-900 font-medium mt-4'>
                    Price: <span className='text-gray-600'>{currencySymbol}{medInfo.price}</span>
                </p>
                <button onClick={placeOrder} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full hover:scale-105 transition-all duration-300 my-6'>
                    {medInfo.available ? 'Buy Now' : 'Out of Stock'}
                </button>
            </div>
        </div>
    ) : <div className='opacity-0'></div>
}

export default MedicineDetails