import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { trackAddToCart } from '@/components/GoogleAnalytics';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  category?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size?: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Load initial state from localStorage
const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      return {
        items: parsed.items || [],
        total: parsed.total || 0,
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return { items: [], total: 0 };
};

const initialState: CartState = loadCartFromStorage();

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      newState = { items: newItems, total: newTotal };
      
      // Track add to cart event for new items
      if (existingItemIndex < 0) {
        trackAddToCart(action.payload);
      }
      break;
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => !(item.id === action.payload.id && item.size === action.payload.size)
      );
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      newState = { items: newItems, total: newTotal };
      break;
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { 
          type: 'REMOVE_ITEM', 
          payload: { id: action.payload.id, size: action.payload.size } 
        });
      }

      const newItems = state.items.map(item =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      newState = { items: newItems, total: newTotal };
      break;
    }

    case 'CLEAR_CART':
      newState = { items: [], total: 0 };
      break;

    default:
      return state;
  }
  
  // Save to localStorage
  try {
    localStorage.setItem('cart', JSON.stringify(newState));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
  
  return newState;
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

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