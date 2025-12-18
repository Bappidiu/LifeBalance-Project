import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  
  // User Authentication State
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [userData, setUserData] = useState(false);

  // 1. Fetch Doctors List
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //get medicine fetch
  const getMedicinesData = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/medicine/list');
        if (data.success) {
            setMedicines(data.medicines);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}

  // 2. Load User Profile Data
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // 3. Book Appointment Function
  const bookAppointment = async (docId, slotDate, slotTime) => {
      try {
          const {data} = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {headers:{token}})
          if(data.success){
              toast.success(data.message)
              getDoctorsData() // Refresh slots
              loadUserProfileData() // Refresh user history
              return true; // Return true to indicate success
          } else {
              toast.error(data.message)
              return false;
          }
      } catch (error) {
          console.log(error)
          toast.error(error.message)
          return false;
      }
  }

  useEffect(() => {
    getDoctorsData();
    getMedicinesData();
  }, []);

  // Load user data if token exists
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    bookAppointment,
    medicines,
    getMedicinesData
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;