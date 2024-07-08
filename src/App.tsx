import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MapPage from "./maps/MapPage/MapPage";
import Login from "./signin_signup/organisms/Login";
import SignUp from "./signin_signup/organisms/SignUp";
import InfoPage from "./detailPage/organisms/InfoPage";
import HomePage from "./admin/page/HomePage";
import InventoryManagementPage from "./admin/page/InventoryManagementPage";
import UserPage from "./admin/page/UserPage";
import MenuRegistrationPage from "./admin/page/MenuRegistrationPage";

const App = () => {
  const storeId = 1;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/information/:storeId" element={<InfoPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryManagementPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/menu-registration" element={<MenuRegistrationPage />} />
      </Routes>
      <Link to={`/information/${storeId}`}></Link>
    </Router>
  );
};

export default App;
