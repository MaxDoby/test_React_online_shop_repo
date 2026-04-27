import { useState, useEffect } from 'react';
import {
	logicAddToCart,
	logicRemoveFromCart,
	logicClearCart,
	logicIncreaseCartItemQuantity,
	logicDecreaseCartItemQuantity,
} from '../utils/useCart.ts';

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
}

export interface CartItem extends Product {
	quantity: number;
}

const productsOnPage = 9;
const searchDebounceMs = 500;
const cartStorageKey = 'mini-shop-cart';

const useAppState = () => {
	// 1. Stările aplicației (Memoria)
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isCartLoaded, setIsCartLoaded] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [activeCategory, setActiveCategory] = useState<string>('Toate');
	const [totalProducts, setTotalProducts] = useState<number>(0);
	const [currentView, setCurrentView] = useState<'shop' | 'cart'>('shop');

	const addToCart = (product: Product) => {
		logicAddToCart(product, setCartItems);
	};
	const removeFromCart = (productId: number) => {
		logicRemoveFromCart(productId, setCartItems);
	};
	const clearCart = () => {
		logicClearCart(setCartItems);
	};
	const increaseCartItemQuantity = (productId: number) => {
		logicIncreaseCartItemQuantity(productId, setCartItems);
	};
	const decreaseCartItemQuantity = (productId: number) => {
		logicDecreaseCartItemQuantity(productId, setCartItems);
	};
	const checkout = () => {
		alert('Comanda a fost plasată cu succes!');
		setCartItems([]);
		setCurrentView('shop');
	};

	const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const response = await fetch('https://dummyjson.com/products/category-list');
				if (!response.ok) throw new Error('Categories fetch Error');

				const data: string[] = await response.json();
				setCategories(['Toate', ...data]);
			} catch (error) {
				console.error('Fetch Categories Error:', error);
			}
		};
		loadCategories();
	}, []);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery.trim());
		}, searchDebounceMs);

		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	useEffect(() => {
		const uploadProducts = async () => {
			try {
				const skip = (currentPage - 1) * productsOnPage;
				const trimmedSearch = debouncedSearchQuery.trim();

				let url = `https://dummyjson.com/products?limit=${productsOnPage}&skip=${skip}`;

				if (trimmedSearch) {
					url = `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedSearch)}&limit=${productsOnPage}&skip=${skip}`;
				} else if (activeCategory !== 'Toate') {
					url = `https://dummyjson.com/products/category/${activeCategory}?limit=${productsOnPage}&skip=${skip}`;
				}

				const response = await fetch(url);
				if (!response.ok) throw new Error('Products fetch Error');

				const data = await response.json();

				setProducts(data.products);
				setTotalProducts(data.total);
			} catch (error) {
				console.error('Fetch Error:', error);
			}
		};

		uploadProducts();
	}, [currentPage, activeCategory, debouncedSearchQuery]);

	useEffect(() => {
		const savedCart = localStorage.getItem(cartStorageKey);

		if (savedCart) {
			setCartItems(JSON.parse(savedCart));
		}
		setIsCartLoaded(true);
	}, []);

	useEffect(() => {
		if (!isCartLoaded) return;
		localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
	}, [cartItems, isCartLoaded]);

	const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return {
		products,
		setProducts,
		categories,
		setCategories,
		searchQuery,
		setSearchQuery,
		cartItems,
		setCartItems,
		cartCount,
		addToCart,
		currentPage,
		setCurrentPage,
		selectedImage,
		setSelectedImage,
		activeCategory,
		setActiveCategory,
		totalProducts,
		setTotalProducts,
		productsOnPage,
		cartTotal,
		currentView,
		setCurrentView,
		removeFromCart,
		clearCart,
		checkout,
		increaseCartItemQuantity,
		decreaseCartItemQuantity,
	};
};

export default useAppState;
