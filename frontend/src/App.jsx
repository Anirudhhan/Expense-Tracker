import React, { useEffect} from "react";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate} from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {

  const { checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth()  
  }, [checkAuth])
  
  return (
    <div>
      {/* <Navbar/> */}
      {authUser && <Sidebar/>}
      <Routes>
        <Route path="/" element={authUser? <HomePage/>: <Navigate to="login"/> } />
        <Route path="/login" element={!authUser? <LoginPage/>: <Navigate to="/"/> } />
        <Route path="/signup" element={!authUser? <SignUpPage/>: <Navigate to="/"/> } /> 
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;
