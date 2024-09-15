import axios from 'axios';
import { useAppDispatch } from '../../state/store';
import { loginSuccess } from '../../state/features/auth/authSlice';
import { LoginResponse } from '../../types';

function useRefresh() {

    const dispatch = useAppDispatch();

    const refresh = async () => {
        const response = await axios.get<LoginResponse>(process.env.REACT_APP_API_URL + "/token/refresh", {
            withCredentials: true,
          });

         dispatch(loginSuccess(response.data.user))
         return response
    }

    return refresh


}

export default useRefresh