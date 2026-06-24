import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [cars, setCars] = useState([])

    // check if user is login
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/me')

            if (data.success) {
                setUser(data.user)
                setIsOwner(data.user.role === 'owner')
            }
            else {
                navigate('/')
            }
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error?.response?.data?.errors?.[0] ||
                error.message;

            toast.error(msg);
        }
    }

    // fetch logged in user cars
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars')
            data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error?.response?.data?.errors?.[0] ||
                error.message;

            toast.error(msg);
        }
    }

    // logout 
    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You have been looged out')
    }

    // get token from local storage
    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars()
    }, [])

    // fetch user when token is set
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchUser()
        }
    }, [token])

    const value = {
        navigate,
        currency,
        axios,
        user,
        setUser,
        token,
        setToken,
        isOwner,
        setIsOwner,
        fetchUser,
        showLogin,
        setShowLogin,
        logout,
        fetchCars,
        cars
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
