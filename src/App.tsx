import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import Statuses from "./components/Statuses/Statuses";

function App() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="App">
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
        <Statuses />
      </div>
    </>
  );
}

export default App;
