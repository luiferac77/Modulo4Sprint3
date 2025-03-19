import React, { useState, useEffect } from 'react';
import {ShoppingCartSimple, Lightning} from 'phosphor-react';
import usePopProducts from '../hooks/usePopProducts'; //importo el hook personalizado que maneja el popup
import ProductPopUp from './ProductPopUp'; //importo el componente popup de producto
import { useTheme } from '../context/ThemeContext';


const ProductList = () => {

    //declaro un hook useStae para setear los productos de un archivo json
    //El valor inicial es un arreglo vacío
    const [products, setProducts] = useState([]);
    const productsRoute = '/db/productsList.json'; //ruta de los productos
    const { isOpen, openPopUp, closePopUp, selectedProduct, cant, setCant } = usePopProducts(); //hook del popup
    const { darkMode } = useTheme();

    //uso un hook useEffect para que al montar el componente, me recupere los productos del archivo json
    useEffect(() => {
        fetch(productsRoute) //con una promesa recupero los datos de los productos
            .then((response) => response.json())
            .then((data) => {
                setProducts(data); //seteo los datos en products
                //console.log(data);
            })
            .catch(error => console.error("Error al cargar el archivo", error));
    }, []);
    

    return (
        
        <div className={`relative w-full min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>  
        <h1 className={`flex container mx-auto pt-4 text-3xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
        <Lightning size={32} weight='fill'/>&nbsp;Eletrónica
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 container mx-auto'>
            
            {/* Cards de productos */}
            {
                products.map(product => (
                    <div key={product.id} 
                    className={`relative border border-gray-300 rounded-lg p-4 shadow-lg bg-white`}>
                        <img
                            className='w-full h-48 object-contain rounded-t-lg'
                            src={product.image}
                            alt={product.name}
                        />
                        <h2 className='mt-2 text-xl font-semibold pl-4 text-gray-800'>{product.name}</h2>
                        <p className='text-gray-600 pl-4'>${product.price}</p>
                        <button 
                            onClick={() => openPopUp(product)}
                            className=
                            {`absolute w-10 h-10 rounded-full bottom-4 right-4 flex items-center justify-center p-2 cursor-pointer transition shadow-lg ${
                                darkMode ? 'bg-gray-700 hover:bg-green-500 border-gray-500' : 'bg-gray-400 hover:bg-green-700 border-gray-500'
                            }`}
                        >
                        <ShoppingCartSimple size={32} color="#ffffff" weight="fill" />
                        </button>
                    </div>
                ))
            }
            {/* Fin de Cards de productos */}

            {/* ventana modal */}
            {
                isOpen && (
                    <ProductPopUp
                        product = {selectedProduct}
                        onClose = {closePopUp}
                        cant = {cant}
                        setCant = {setCant}
                    >
                    </ProductPopUp>
                )
            }
            {/* Fin de ventana modal */}
        </div>  
    </div>
);
}

export default ProductList;