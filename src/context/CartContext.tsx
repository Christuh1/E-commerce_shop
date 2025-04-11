import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartState, CartAction, CartItem } from '../types';

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return calculateCartTotals({ ...state, items: updatedItems });
      }
      
      const newItems = [...state.items, { product: action.payload, quantity: 1 }];
      return calculateCartTotals({ ...state, items: newItems });
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      return calculateCartTotals({ ...state, items: newItems });
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      return calculateCartTotals({ ...state, items: updatedItems });
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

const calculateCartTotals = (state: CartState): CartState => {
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  return { ...state, itemCount, total };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  });
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};