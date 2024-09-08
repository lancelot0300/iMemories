import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useRefresh from "../../hooks/useRefresh/useRefresh";

function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const isUseEffectMounted = useRef(false);

  const refresh = useRefresh();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isUseEffectMounted.current) {
      isUseEffectMounted.current = true;
      refresh()
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          if (
            location.pathname !== "/login" &&
            location.pathname !== "/register"
          ) {
            navigate("/login");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isUseEffectMounted.current]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default PersistLogin;
