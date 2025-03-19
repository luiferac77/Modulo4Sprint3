import React, { useState } from 'react';
import { Storefront, ShoppingCartSimple, Moon, Sun} from 'phosphor-react';
import {useCart} from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import CartModal from './CartModal';

const Header = () => {

    const {cart} = useCart() //consumo el contexto
    const totalItems = cart.length;
    const [showModal, setShowModal] = useState(false);
    const { darkMode, setDarkMode } = useTheme();

    return (
        
        <header className={`flex items-center justify-center w-full p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-500 text-black'}`}>
            <div className='flex container mx-auto justify-between items-center'>
                <h1 className='flex text-xl font-bold items-center'>
                <Storefront size={32} className='text-yellow-400' weight='fill' />
                <span className='text-yellow-400'>&nbsp;Mi Tienda</span>
                </h1>
                <div className='flex items-center space-x-4'>
                    {/* Botón para el carrito */}
                    <button 
                        id='viewCart' 
                        className='relative cursor-pointer'
                        onClick={() => setShowModal(true)}
                    >
                    <ShoppingCartSimple size={32} className={`${darkMode ? 'text-gray-300' : 'text-white'}`} weight="fill" />
                    {
                        totalItems > 0 && (
                            <span className='absolute -top-2 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                                {totalItems}
                            </span>
                            
                        )  
                    }
                    </button>
                    {/* Fin del botón para el carrito */}
                    {/* Botón para el theme */}
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 cursor-pointer">
                        {darkMode ? <Sun size={32} className='text-yellow-500 shadow' weight='fill' /> : <Moon size={32} className='text-gray-300 shadow' weight='fill' />}
                    </button>
                    {/* Fin del botón para el theme */}
                </div>
            </div>

            {showModal && <CartModal closeModal={() => setShowModal(false)} />}

        </header>
    )
}

export default Header