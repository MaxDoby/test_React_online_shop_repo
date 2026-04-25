import { useState, useEffect } from 'react';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
}

export const useAppState = () => {
    // 1. Stările aplicației (Memoria) 
    const [products, setProducts] = useState<Product[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const uploadProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products?limit=100');
                if (!response.ok) throw new Error('Server Error');
                const date = await response.json();
                
                setProducts(date.products);
            } catch (error) {
                console.error('Fetch Error:', error)
            }
        }

        uploadProducts();
    }, [])
    

    return {
        products, setProducts,
        cartCount, setCartCount,
        searchQuery, setSearchQuery,
        currentPage, setCurrentPage,
        selectedImage, setSelectedImage,
    };
};