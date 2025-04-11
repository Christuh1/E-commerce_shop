import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ShoppingCart: React.FC = () => {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        
        {state.items.map((item) => (
          <div key={item.product.id} className="flex items-center py-4 border-b">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            
            <div className="ml-4 flex-grow">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.product.id, quantity: item.quantity - 1 },
                  })
                }
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus size={16} />
              </button>
              
              <span className="mx-2">{item.quantity}</span>
              
              <button
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.product.id, quantity: item.quantity + 1 },
                  })
                }
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
              
              <button
                onClick={() =>
                  dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })
                }
                className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between mb-2">
            <span>Items:</span>
            <span>{state.itemCount}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${state.total.toFixed(2)}</span>
          </div>
          
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart