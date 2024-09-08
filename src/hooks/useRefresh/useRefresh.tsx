import axios from 'axios';
import { useAppDispatch } from '../../state/store';
import { loginSuccess } from '../../state/features/auth/authSlice';

function useRefresh() {

    const dispatch = useAppDispatch();

    const refresh = async () => {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/token/refresh", {
            withCredentials: true,
          });

         dispatch(loginSuccess(response.data))
         return response
    }

    return refresh


}

export default useRefresh