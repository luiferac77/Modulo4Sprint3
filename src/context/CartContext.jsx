import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(); //creo el contexto cartContext

export const useCart = () => { //hook personnalizado
    //useContext permite que un componente consuma el contexto que se ha creado . se puede acceder a los valores qye se han proporcionado a cartContext en la jerarquia de componentes
    return useContext(CartContext); 
}

//proveedor del estado del carrito
export const CartProvider = ({children}) => {
    
    const [cart, setCart] = useState([]); //hoook usState dónde cart es el estado del carrito, setCart es la función que modifica el estado
    
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || []; //recupero los items del carrito
      setCart(storedCart); //actualizao el estado del carrito
    }, []);

    const addToCart = (product) => { //recibo como parámetro el producto seleccionado
        //modifico el estado de cart agregando el producto seleccionado cart
        setCart(
            (productInCart) => { //productInCart trae los productos del carrito
                const existProductInCart =  productInCart.find(p => p.id === product.id);
                if(!existProductInCart){ //si no existe el producto en el carrito, concateno el nuevo producto al carrito en updatedCart
                    const updatedCart = [...productInCart, product];
                    localStorage.setItem('cart', JSON.stringify(updatedCart)); //envio el carrito actualizado al localstorage
                    return updatedCart;
                } else {
                    alert(`El producto ${product.name} ya está agregado al carrito`);
                    return productInCart;
                }
            }
        );
    }

    const removeItemFromCart = (id) => {
        setCart((productInCart) => {
            const updatedCart = productInCart.filter(p => p.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }

    const totalCartPrice = cart.reduce((c, item) => c + item.price * item.cant, 0);

    return(
        <CartContext.Provider value={{cart, addToCart, removeItemFromCart, totalCartPrice}} >
            {children}
        </CartContext.Provider>
    );

}
