import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MedicineList = () => {

    const { medicines, getAllMedicines, backendUrl, aToken } = useContext(AdminContext)

    const toggleAvailability = async (medId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/medicine/toggle', { medId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllMedicines()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (aToken) {
            getAllMedicines();
        }
    }, [aToken]);

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Medicines</h1>
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {medicines.map((item, index) => (
                    <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                        <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 w-56 h-48 object-cover' src={item.image} alt="" />
                        <div className='p-4'>
                            <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                            <p className='text-zinc-600 text-sm'>${item.price}</p>
                            <div className='mt-2 flex items-center gap-1 text-sm'>
                                <input onChange={() => toggleAvailability(item._id)} type="checkbox" checked={item.available} />
                                <p>Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MedicineList