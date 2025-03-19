import React from 'react';
import { useCart } from '../context/CartContext';
import {Trash} from 'phosphor-react';

const CartModal = ({ closeModal }) => {

    const { cart, removeItemFromCart, totalCartPrice } = useCart();

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                    <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>

                    {cart.length === 0 ? (
                        <p className="text-gray-500">El carrito está vacío.</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center border p-3 rounded-lg shadow-sm">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="ml-4 flex-1">
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-gray-600">${item.price} x {item.cant}</p>
                                        <p className="font-semibold">Subtotal: ${item.price * item.cant}</p>
                                    </div>
                                    <button 
                                        className=' text-red-500 px-3 py-1 text-sm cursor-pointer'
                                        onClick={() => removeItemFromCart(item.id)}
                                    >
                                        <Trash size={32} weight='fill'/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TOTAL */}
                    {cart.length > 0 && (
                        <div className="mt-6 text-lg font-bold text-right">
                            Total: ${totalCartPrice.toFixed(2)}
                        </div>
                    )}

                    {/* BOTONES */}
                    <div className="flex justify-end mt-4 space-x-2">
                        <button 
                            className="bg-gray-600 text-white px-4 py-2 rounded"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
        </div>
    );
}

export default CartModal;