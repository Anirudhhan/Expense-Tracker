import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
    setDarkMode: (darkMode) => {
        set({ darkMode });
        if (darkMode) {
            localStorage.setItem('darkMode', 'true');   
        } else {
            localStorage.setItem('darkMode', 'false');   
        } 
    }
    
}));