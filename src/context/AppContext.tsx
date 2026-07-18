'use client';

import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

export interface Product {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  createdAt: string;
  userId?: string;
}

interface AppContextType {
  products: Product[];
  isLoadingProducts: boolean;
  fetchProducts: (params?: { search?: string; category?: string; sortBy?: string; sortOrder?: string; page?: number; limit?: number }) => Promise<{ products: Product[]; totalPages: number }>;
  getProductById: (id: string) => Promise<Product | null>;
  addProduct: (productData: Omit<Product, '_id' | 'createdAt' | 'userId'>, userId: string) => Promise<boolean>;
  deleteProduct: (id: string, userId: string) => Promise<boolean>;
  apiBaseUrl: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

  const fetchProducts = async (params?: {
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
  }) => {
    setIsLoadingProducts(true);
    try {
      const queryParts: string[] = [];
      if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
      if (params?.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
      if (params?.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
      if (params?.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);
      if (params?.page) queryParts.push(`page=${params.page}`);
      if (params?.limit) queryParts.push(`limit=${params.limit}`);
      
      const queryStr = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      
      const res = await fetch(`${apiBaseUrl}/products${queryStr}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setIsLoadingProducts(false);
        return { 
          products: data.products || [], 
          totalPages: data.pagination?.totalPages || 1 
        };
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to fetch products');
      }
    } catch (e) {
      toast.error('Failed to connect to the backend server');
    }
    setIsLoadingProducts(false);
    return { products: [], totalPages: 1 };
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const res = await fetch(`${apiBaseUrl}/products/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      toast.error('Failed to connect to the backend server');
    }
    return null;
  };

  const addProduct = async (productData: Omit<Product, '_id' | 'createdAt' | 'userId'>, userId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${apiBaseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`,
          'x-user-id': userId
        },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.product) {
          setProducts(prev => [data.product, ...prev]);
          toast.success('Product created successfully.');
          return true;
        }
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to create product.');
      }
    } catch (e) {
      toast.error('Failed to connect to the backend server');
    }
    return false;
  };

  const deleteProduct = async (id: string, userId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${apiBaseUrl}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userId}`,
          'x-user-id': userId
        }
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
        toast.success('Product deleted successfully.');
        return true;
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to delete product.');
      }
    } catch (e) {
      toast.error('Failed to connect to the backend server');
    }
    return false;
  };

  return (
    <AppContext.Provider value={{
      products,
      isLoadingProducts,
      fetchProducts,
      getProductById,
      addProduct,
      deleteProduct,
      apiBaseUrl
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
