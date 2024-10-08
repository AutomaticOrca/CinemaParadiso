import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import CommonLayout from "./shared/layouts/CommonLayout";
import Home from "./shared/pages/Home";
import Auth from "./user/pages/Auth";
import UserProfile from "./user/pages/UserProfile";
import NowShowingPage from "./showtimes/pages/NowShowingPage";
import CinemaPage from "./cinema/pages/CinemaPage";
import MovieDetailsPage from "./movieDetails/pages/MovieDetailsPage";
import PurchasePage from "./purchases/pages/PurchasePage";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  const ProtectedRoute = ({ element: Component, ...rest }) => {
    return token ? <Component {...rest} /> : <Navigate to="/auth" />;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <CommonLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/user-profile"
              element={<ProtectedRoute element={UserProfile} />}
            />
            <Route path="/nowshowing" element={<NowShowingPage />} />
            <Route path="/cinemas" element={<CinemaPage />} />
            <Route path="/session/:sessionid" element={<MovieDetailsPage />} />
            <Route path="/purchase/:sessionid" element={<PurchasePage />} />
          </Routes>
        </CommonLayout>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
