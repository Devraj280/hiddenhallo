import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  original_price?: number;
  rating: number;
  reviews_count: number;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
}

interface WishlistContextType {
  state: WishlistState;
  addToWishlist: (product: WishlistItem) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WishlistState>({
    items: [],
    loading: true,
  });
  const { user } = useAuth();

  const fetchWishlistItems = async () => {
    if (!user) {
      setState({ items: [], loading: false });
      return;
    }

    try {
      const { data: wishlistData, error: wishlistError } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', user.id);

      if (wishlistError) throw wishlistError;

      if (wishlistData.length === 0) {
        setState({ items: [], loading: false });
        return;
      }

      const productIds = wishlistData.map(item => item.product_id);
      
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .in('id', productIds);

      if (productsError) throw productsError;

      setState({
        items: productsData || [],
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setState({ items: [], loading: false });
    }
  };

  const addToWishlist = async (product: WishlistItem) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          product_id: product.id,
        });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        items: [...prev.items, product],
      }));
      toast.success(`${product.name} added to wishlist!`);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add item to wishlist');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== productId),
      }));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist');
    }
  };

  const clearWishlist = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        items: [],
      }));
      toast.success('Wishlist cleared');
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error('Failed to clear wishlist');
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [user]);

  // Real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('wishlist-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wishlists',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchWishlistItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <WishlistContext.Provider value={{ state, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};