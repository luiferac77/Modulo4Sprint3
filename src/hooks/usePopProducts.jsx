import { useState } from "react";

import React from 'react'

const usePopProducts = () => {

    const [selectedProduct, setSelectedProduct] = useState(null); //usestate que me va a servir para setear los productos selecionados
    const [cant, setCant] = useState(1); //seteo la cantidad con un valor inicial de uno
    const [isOpen, setIsOpen] = useState(false);
    
    const openPopUp = (product) => {

        setSelectedProduct(product); //recibo como parámetro el producto seleccionado y lo seteo
        setCant(1); //coloco como valor inical 1 al abrir el popup
        setIsOpen(true);
    }

    const closePopUp = () => {
        setIsOpen(false);
        setSelectedProduct(null);
        setCant(1); //valor inicial de cantidad al abrir el popup en 1
    }
    return (
        {
            isOpen, 
            openPopUp, 
            closePopUp, 
            selectedProduct, 
            cant, 
            setCant
        }
    );
}

export default usePopProducts;