import {  useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../state/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHook/useStateHook";
import axios from "axios";

function PersistLogin() {


  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const login = await axios.post(process.env.REACT_APP_API_URL + "/token/refresh", {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },
      });

      dispatch(loginSuccess(login.data))
      console.log(login.data);
      setLoading(false);
      // navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      // navigate("/login");
    }
  }

  // useEffect(() => {
  //   refreshToken();
  // }, []);

  if (loading) {
    return <div>Loading...</div>
  }



  return <><Outlet /></>;
}

export default PersistLogin;
