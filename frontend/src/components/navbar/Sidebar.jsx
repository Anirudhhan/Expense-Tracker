import React, { useState, useEffect } from 'react';
import { BanknoteArrowDown, BanknoteArrowUp, LayoutDashboard, LogOut, Settings, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../../store/useAuthStore';

function Sidebar() {
    const { authUser, logout } = useAuthStore();
    const [dashboard, setDashboard] = useState(true);
    const [income, setIncome] = useState(false);
    const [expense, setExpense] = useState(false);
    const [settings, setSettings] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();


    // Check if the screen is mobile sized
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkIsMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIsMobile);
        
        // Clean up
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleDashboard = () => {
        setDashboard(true);
        setIncome(false);
        setExpense(false);
        setSettings(false);
        if (isMobile) setIsOpen(false);
        navigate("/");
    }

    const handleIncome = () => {
        setDashboard(false);
        setIncome(true);
        setExpense(false);
        setSettings(false);
        if (isMobile) setIsOpen(false);
        navigate("/income");
    }

    const handleExpense = () => {
        setDashboard(false);
        setIncome(false);
        setExpense(true);
        setSettings(false);
        if (isMobile) setIsOpen(false);
        navigate("/expense");
    }

    const handleSettings = () => {
        setDashboard(false);
        setIncome(false);
        setExpense(false);
        setSettings(true);
        if (isMobile) setIsOpen(false);
        navigate("/settings");
    }

    // Mobile hamburger menu
    const mobileToggle = (
        <div className="md:hidden fixed top-4 left-4 z-50">
            <button 
                onClick={toggleSidebar} 
                className="p-2 rounded-md bg-black/10 hover:bg-black/20"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
    );

    // Sidebar content
    const sidebarContent = (
        <div className='flex flex-col items-center py-20 h-full w-full'>
            <img src={authUser?.profilePic} alt="Profile" className='size-28 rounded-full object-cover border-1' />
            <h1 className='text-xl md:text-2xl font-bold pt-2'>{authUser?.fullName}</h1>

            <div className='gap-4 grid w-full max-w-xs px-4 md:px-0 py-8 md:py-10'>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                        <LayoutDashboard className="h-5 w-5 text-base-content/400" />
                    </div>
                    <button onClick={handleDashboard} className={`w-full pl-10 btn ${dashboard ? "btn-primary" : ""}`}>Dashboard</button>  
                </div>

                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                        <BanknoteArrowDown className="h-5 w-5 text-base-content/400" />
                    </div>
                    <button onClick={handleIncome} className={`w-full pl-10 btn ${income ? "btn-primary" : ""}`}>Income</button>  
                </div>

                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                        <BanknoteArrowUp className="h-5 w-5 text-base-content/400" />
                    </div>
                    <button onClick={handleExpense} className={`w-full pl-10 btn ${expense ? "btn-primary" : ""}`}>Expense</button>  
                </div>

                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                        <Settings className="h-5 w-5 text-base-content/400" />
                    </div>
                    <button onClick={handleSettings} className={`w-full pl-10 btn ${settings ? "bg-red-400" : ""}`}>Settings</button>  
                </div>

                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                        <LogOut className="h-5 w-5 text-base-content/400" />
                    </div>
                    <button onClick={logout} className='w-full pl-10 hover:bg-red-500 btn'>Logout</button>  
                </div>
            </div>
        </div>
    );

    return (
        <>
            {mobileToggle}
            
            {/* Desktop Sidebar - always visible on larger screens */}
            <div className='hidden md:block bg-black/10 h-screen w-72 align-items-center px-6 fixed top-0 left-0 z-50'>
                {sidebarContent}
            </div>
            
            {/* Mobile Sidebar - slides in when toggled */}
            {isMobile && (
                <div 
                    className={`fixed inset-0 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
                >
                    {/* Overlay */}
                    <div 
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    
                    {/* Sidebar */}
                    <div className="relative bg-black/10 h-full w-64">
                        {sidebarContent}
                    </div>
                </div>
            )}
        </>
    )
}

export default Sidebar