import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const { speciality,Location } = useParams()

  const [filterDoc,setFilterDoc] = useState([])

  const [showFilter,setShowFilter] = useState(false)

  const navigate = useNavigate()

  const {doctors} = useContext(AppContext)

  //const applyFilter = ()=>{
   // if(speciality){
     // setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    //}else{
     // setFilterDoc(doctors)
   // }
 // }

 /**  const applyFilterLocation = ()=>{
     if(Location){
      setFilterDoc(doctors.filter(doc => doc.Location === Location))
    }else{
      setFilterDoc(doctors)
    }
  } */


  const applyCombinedFilter = () => {
  let filtered = doctors;

  if (speciality) {
    filtered = filtered.filter(doc => doc.speciality === speciality);
  }

  if (Location) {
    filtered = filtered.filter(doc => doc.Location === Location);
  }

  setFilterDoc(filtered);
};

useEffect(() => {
  applyCombinedFilter();
}, [doctors, speciality, Location]);

 // useEffect(()=>{
    //applyFilter()
 // },[doctors,speciality])

  //useEffect(()=>{
    //applyFilterLocation()
 // },[doctors,Location])

  return (
    <div>
        <p className='text-gray-600 font-bold'>Browse through the doctors specialist.</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
          <div>
            <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter? 'flex': 'hidden sm:flex'}`}>
            <p onClick={()=> speciality === 'General physician' ? navigate(Location ? `/doctors/${Location}` : '/doctors') : navigate(Location ? `/doctors/General physician/${Location}` : '/doctors/General physician')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
            <p onClick={()=> speciality === 'Gynecologist' ? navigate(Location ? `/doctors/${Location}` : '/doctors') : navigate(Location ? `/doctors/Gynecologist/${Location}` : '/doctors/Gynecologist')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
            <p onClick={()=> speciality === 'Dermatologist' ? navigate(Location ? `/doctors/${Location}` : '/doctors') : navigate(Location ? `/doctors/Dermatologist/${Location}` : '/doctors/Dermatologist')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
            <p onClick={()=> speciality === 'Pediatricians' ? navigate(Location ? `/doctors/${Location}` : '/doctors') : navigate(Location ? `/doctors/Pediatricians/${Location}` : '/doctors/Pediatricians')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
            <p onClick={()=> speciality === 'Neurologist' ? navigate(Location ? `/doctors/${Location}` : '/doctors') : navigate(Location ? `/doctors/Neurologist/${Location}` : '/doctors/Neurologist')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
            <p onClick={()=> speciality === 'Gastroenterologist' ? navigate(Location ? `/doctors/${Location}` : '/doctors') : navigate(Location ? `/doctors/Gastroenterologist/${Location}` : '/doctors/Gastroenterologist')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
          </div>
          
          {/* <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter? 'flex': 'hidden sm:flex'}`}> */}
            {/* <p className='text-gray-600 font-bold mt-8'>Find by location</p>
            <p onClick={()=> Location === 'Dhaka' ? navigate(speciality ? `/doctors/${speciality}` : '/doctors') : navigate(speciality ? `/doctors/${speciality}/Dhaka` : '/doctors/Location/Dhaka')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${Location === "Dhaka" ? "bg-indigo-100 text-black" : ""}`}>Dhaka</p>
            <p onClick={()=> Location === 'Chittagonj' ? navigate(speciality ? `/doctors/${speciality}` : '/doctors') : navigate(speciality ? `/doctors/${speciality}/Chittagonj` : '/doctors/Location/Chittagonj')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${Location === "Chittagonj" ? "bg-indigo-100 text-black" : ""}`}>Chittagonj</p>
            <p onClick={()=> Location === 'Khulna' ? navigate(speciality ? `/doctors/${speciality}` : '/doctors') : navigate(speciality ? `/doctors/${speciality}/Khulna` : '/doctors/Location/Khulna')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${Location === "Khulna" ? "bg-indigo-100 text-black" : ""}`}>Khulna</p>
            <p onClick={()=> Location === 'Rajshahi' ? navigate(speciality ? `/doctors/${speciality}` : '/doctors') : navigate(speciality ? `/doctors/${speciality}/Rajshahi` : '/doctors/Location/Rajshahi')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${Location === "Rajshahi" ? "bg-indigo-100 text-black" : ""}`}>Rajshahi</p>
            <p onClick={()=> Location === 'Sylhet' ? navigate(speciality ? `/doctors/${speciality}` : '/doctors') : navigate(speciality ? `/doctors/${speciality}/Sylhet` : '/doctors/Location/Sylhet')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${Location === "Sylhet" ? "bg-indigo-100 text-black" : ""}`}>Sylhet</p>
            <p onClick={()=> Location === 'Barishal' ? navigate(speciality ? `/doctors/${speciality}` : '/doctors') : navigate(speciality ? `/doctors/${speciality}/Barishal` : '/doctors/Location/Barishal')} className={`w-[94vm] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${Location === "Barishal" ? "bg-indigo-100 text-black" : ""}`}>Barishal</p>
          </div> */}
          </div>

          <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
            {
              filterDoc.map((item,index)=>(
                <div onClick={()=>{navigate(`/appoinment/${item._id}`);scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))
            }
          </div>
        </div>
    </div>
  )
}

export default Doctors