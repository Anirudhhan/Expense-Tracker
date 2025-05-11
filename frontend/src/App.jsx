import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUpPage";
import Sidebar from "./components/navbar/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import SettingsPage from "./pages/SettingsPage";
import { useExpenseStore } from "./store/useExpenseStore";
import { Loader } from "lucide-react";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { isCheckingAuth, checkAuth, authUser } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);

  const { getDashboardData} = useExpenseStore();
  const {darkMode } = useThemeStore();

  useEffect(() => {
    checkAuth();
    getDashboardData();
    
    // Check for mobile screen size
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [checkAuth, getDashboardData]);


  if ( isCheckingAuth && !authUser ) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen" data-theme = {darkMode? "dark": "light"} >
      {authUser && <Sidebar />}
      <div className={`flex-1 ${authUser && !isMobile ? "md:ml-72" : ""}`}>
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