import {  useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../state/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHook/useStateHook";

function PersistLogin() {


  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const persistLogin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
    setLoading(false);
  };



  return <><Outlet /></>;
}

export default PersistLogin;
