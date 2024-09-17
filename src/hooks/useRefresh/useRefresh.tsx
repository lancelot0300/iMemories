import axios from 'axios';
import { useAppDispatch } from '../../state/store';
import { loginSuccess } from '../../state/features/auth/authSlice';
import { LoginResponse } from '../../types';
import { useLocation, useNavigate } from 'react-router-dom';

function useRefresh() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const location = useLocation()

    const refresh = async () => {
        try {
            const response = await axios.get<LoginResponse>(process.env.REACT_APP_API_URL + "/token/refresh", {
                withCredentials: true,
              });
    
             dispatch(loginSuccess(response.data.user))
             return response
        } catch (error) {
            if (!["/login", "/register"].includes(location.pathname)) {
                navigate("/login");
              }
            throw new Error
        }
    }

    return refresh


}

export default useRefresh