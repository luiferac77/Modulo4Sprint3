import React from 'react';
import {XCircle, ShoppingCartSimple} from 'phosphor-react';
import {useCart} from '../context/CartContext';

const ProductPopUp = ({ product, onClose, cant, setCant }) => {

  const {addToCart} = useCart(); //consumo el contexto

  if(!product) return null;

  const handleAddToCart = () => {
    //defino un objeto del producto seleccionado y le agrego la cantidad
    const itemCart = {
      id: product.id, 
      name: product.name, 
      price: product.price, 
      cant: cant, 
      image: product.image
    }

    addToCart(itemCart);
    onClose();
  }

  return (
    <div className='flex items-center justify-center fixed inset-0 bg-black/50'>
        <div className='relative bg-white rounded-lg p-6 w-80 mt-4'>
          <button 
            className='absolute top-2 right-2 cursor-pointer'
            onClick={onClose}
          >
            <XCircle size={32} />  
          </button> 
          <div className='mt-10'>
            <img className='w-full h-48 object-contain my-2' src={product.image} alt={product.name} />
            <h2 className='text-xl font-semibold text-gray-700'>{product.name}</h2>
            <p className='text-gray-600'>${product.price}</p>
            <div className='mt-4'>
              <label className='block text-gray-700'>Cantidad</label>
              <input 
                type='number'
                value={cant}
                onChange={(e) => setCant(Number(e.target.value))} //cada vez que se ingrsa un valor se setea cant
                min={1} //la cantidad no debe ser menor a 1
                className='border border-gray-700 w-full py-2 px-4 rounded'
              />
            </div>
            <div className='mt-4'>
              <button 
                onClick={handleAddToCart}
                className='flex items-center justify-center bg-green-600 w-full rounded-lg py-4 px-2 text-white font-semibold cursor-pointer hover:bg-green-700 transition'>
              <ShoppingCartSimple size={24} />&nbsp;Agregar
              </button>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default ProductPopUp;