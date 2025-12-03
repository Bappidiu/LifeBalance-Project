import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  // Get the backend URL from the environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Create a state to store the doctors fetched from the database
  const [doctors, setDoctors] = useState([]);

  // Function to fetch doctors data from the API
  const getDoctorsData = async () => {
    try {
      // Calling the API endpoint (Ensure this route exists in your backend)
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

  // Run this function once when the app loads
  useEffect(() => {
    getDoctorsData();
  }, []);

  const value = {
    doctors,
    currencySymbol,
    getDoctorsData,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;