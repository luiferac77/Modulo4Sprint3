import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(); //creo el contexto

export const useTheme = () => useContext(ThemeContext); // hook personalizado que va a comsumir el contexto

//función proveedora del cotexto
export const ThemeProvider = ({ children }) => {
    
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {

        if(darkMode){
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

    }, [darkMode]);

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );
    

}