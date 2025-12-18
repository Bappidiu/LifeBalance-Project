import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets' // Ensure you have a search_icon in assets

const Shop = () => {

    const { medicines } = useContext(AppContext)
    const navigate = useNavigate()
    
    // State for Search
    const [search, setSearch] = useState('')
    const [filterMed, setFilterMed] = useState([])

    // Filter Logic
    const applyFilter = () => {
        if (search) {
            setFilterMed(medicines.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
        } else {
            setFilterMed(medicines)
        }
    }

    // Run filter when search text or medicines list changes
    useEffect(() => {
        applyFilter()
    }, [medicines, search])

    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-8'>
                <div>
                    <p className='text-gray-600 font-bold text-2xl'>Medical Store</p>
                    <p className='text-gray-600 text-sm'>Browse our list of trusted medicines.</p>
                </div>
                
                {/* Search Bar */}
                <div className='flex items-center w-full sm:w-1/3 bg-white border border-gray-300 rounded-full px-4 py-2 mt-4 sm:mt-0'>
                    <input 
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search} 
                        className='flex-1 outline-none text-sm' 
                        type="text" 
                        placeholder='Search for medicines...' 
                    />
                    <img className='w-4 cursor-pointer' src={assets.search_icon} alt="search" />
                </div>
            </div>

            <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                {/* Map through filterMed instead of medicines */}
                {filterMed.map((item, index) => (
                    <div onClick={() => navigate(`/medicine/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                        <img className='bg-indigo-50 w-full h-48 object-cover' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                                <p>{item.available ? 'In Stock' : 'Out of Stock'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm line-clamp-2'>{item.description}</p>
                            <p className='text-gray-900 font-bold mt-2'>${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop