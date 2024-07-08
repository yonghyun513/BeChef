import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapPage from "./maps/MapPage/MapPage";
import Login from "./signin_signup/organisms/Login";
import SignUp from "./signin_signup/organisms/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
