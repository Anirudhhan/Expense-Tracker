import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
  const { checkAuth, authUser } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    checkAuth();
    
    // Check for mobile screen size
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [checkAuth]);
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {authUser && <Sidebar />}
      <div className={`flex-1 ${authUser && !isMobile ? "md:ml-0" : ""}`}>
        {/* <Navbar /> */}
        <main className="">
          <Routes>
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="/" element={authUser ? <DashboardPage /> : <Navigate to="/login" />} />
            <Route path="/income" element={authUser ? <IncomePage /> : <Navigate to="/login" />} />
            <Route path="/expense" element={authUser ? <ExpensePage /> : <Navigate to="/login" />} />
            <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default App;