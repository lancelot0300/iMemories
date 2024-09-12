import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useRefresh from "../../hooks/useRefresh/useRefresh";
import LoadingHome from "../../pages/Home/LoadingHome";

function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const isUseEffectMounted = useRef(false);

  const refresh = useRefresh();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isUseEffectMounted.current) return;
    isUseEffectMounted.current = true;

    const date = new Date();
    const sessionTill = new Date(localStorage.getItem("sessionTill") || "0");
    const isRemembered = localStorage.getItem("isRemembered") === "true";

    if (!isRemembered && sessionTill < date) {
      navigate("/login");
      setLoading(false);
      return;
    }

    refresh()
      .then(() => {
        const dateWith30Minutes = new Date(date.getTime() + 30 * 60000);
        localStorage.setItem("sessionTill", dateWith30Minutes.toString());
        navigate("/");
      })
      .catch(() => {
        if (!["/login", "/register"].includes(location.pathname)) {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [location.pathname, navigate, refresh]);

  if (loading) {
    return <LoadingHome />;
  }

  return <Outlet />;
}

export default PersistLogin;
