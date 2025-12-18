import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddMedicine = () => {

    const [image, setImage] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('General')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            if (!image) return toast.error("Image Not Selected")

            const formData = new FormData()
            formData.append('image', image)
            formData.append('name', name)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('stock', stock)
            formData.append('category', category)

            const { data } = await axios.post(backendUrl + '/api/medicine/add', formData, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setImage(false)
                setName('')
                setPrice('')
                setDescription('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Medicine</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl'>
                
                {/* Image Upload */}
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="med-img">
                        <img className='w-16 bg-gray-100 rounded-lg cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="med-img" hidden />
                    <p>Upload Product <br /> Image</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Medicine Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='e.g. Paracetamol' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Price</p>
                            <input onChange={(e) => setPrice(e.target.value)} value={price} className='border rounded px-3 py-2' type="number" placeholder='25' required />
                        </div>
                         <div className='flex-1 flex flex-col gap-1'>
                            <p>Stock Quantity</p>
                            <input onChange={(e) => setStock(e.target.value)} value={stock} className='border rounded px-3 py-2' type="number" placeholder='100' required />
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Description</p>
                            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='border rounded px-3 py-2' rows={5} placeholder='Short details about medicine' required />
                        </div>
                    </div>
                </div>

                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Medicine</button>
            </div>
        </form>
    )
}

export default AddMedicine