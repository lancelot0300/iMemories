import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import PersistLogin from "./components/PersistLogin/PersistLogin";

function App() {

  const { user } = useSelector((state: RootState) => state.user);

  const disableContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  }


  return (
    <>
      <div className="App" onContextMenu={disableContextMenu}>
        <Routes>
          <Route element={<PersistLogin />} path="/">
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAllowed={user?.token ? true : false}
                  redirectPath="/"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
