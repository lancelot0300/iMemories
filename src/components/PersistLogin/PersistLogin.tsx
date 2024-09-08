import {  useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useRefresh from "../../hooks/useRefresh/useRefresh";

function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const isUseEffectMounted = useRef(false);

  const refresh = useRefresh();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isUseEffectMounted.current) {
      isUseEffectMounted.current = true;
      refresh().then(() => {
        navigate("/");
      }).catch(() => {
        navigate("/login");
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [isUseEffectMounted.current]);

  if (loading) {
    return <div>Loading...</div>
  }



  return <>
    <Outlet />
  </>;
}

export default PersistLogin;
