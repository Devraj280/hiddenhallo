import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { CartItem } from '@/context/CartContext';
import { toast } from 'sonner';

interface CartItemDB {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  size: string | null;
  created_at: string;
  updated_at: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export const useSupabaseCart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            id,
            name,
            price,
            image,
            category
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching cart:', error);
        return [];
      }

      return data as CartItemDB[];
    },
    enabled: !!user,
    staleTime: 30000, // 30 seconds
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity, size }: { productId: string; quantity: number; size?: string }) => {
      if (!user) throw new Error('User must be logged in');

      const { data, error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity,
          size: size || null
        }, {
          onConflict: 'user_id,product_id,size'
        })
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Item added to cart!');
    },
    onError: (error: any) => {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      if (quantity <= 0) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
    },
    onError: (error: any) => {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Item removed from cart');
    },
    onError: (error: any) => {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    }
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User must be logged in');
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Cart cleared');
    },
    onError: (error: any) => {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  });

  // Convert DB format to CartItem format
  const formattedCartItems: CartItem[] = cartItems.map(item => ({
    id: item.product_id,
    name: item.products.name,
    price: item.products.price,
    image: item.products.image,
    quantity: item.quantity,
    size: item.size || undefined,
    category: item.products.category
  }));

  const total = formattedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    cartItems: formattedCartItems,
    total,
    isLoading,
    addToCart: addToCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdating: updateQuantityMutation.isPending,
    isRemoving: removeFromCartMutation.isPending
  };
};