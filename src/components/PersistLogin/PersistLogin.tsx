import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import useRefresh from "../../hooks/useRefresh/useRefresh";
import LoadingHome from "../../pages/Home/LoadingHome";
import { useAppDispatch } from "../../state/store";
import { setNewPathAndFetchAsync, setPathAsync, setUnkownPathAndFetchAsync } from "../../state/features/path/pathSlice";

function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const isUseEffectMounted = useRef(false);

  const refresh = useRefresh();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUseEffectMounted.current) return;
    isUseEffectMounted.current = true;

    const handleSession = async () => {
      const date = new Date();
      const sessionTill = new Date(localStorage.getItem("sessionTill") || "0");
      const isRemembered = localStorage.getItem("isRemembered") === "true";

      if (!isRemembered && sessionTill < date) {
        navigate("/login");
        setLoading(false);
        return;
      }


       const response = await refresh(); 
       if(response) {
        const newSessionExpiry = new Date(date.getTime() + 30 * 60000); 
        localStorage.setItem("sessionTill", newSessionExpiry.toString());
 
        dispatch(setUnkownPathAndFetchAsync(id || ""));
       }

       setLoading(false)
    };

    handleSession(); 
  }, [dispatch, id, navigate, refresh, location.pathname]);

  if (loading) {
    return <LoadingHome />;
  }

  return <Outlet />; 
}

export default PersistLogin;
