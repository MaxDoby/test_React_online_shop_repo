import { useState, useEffect } from 'react';

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
}

const productsOnPage = 9;
const searchDebounceMs = 500;

const useProducts = () => {
	// 1. Stările aplicației (Memoria)
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [activeCategory, setActiveCategory] = useState<string>('Toate');
	const [totalProducts, setTotalProducts] = useState<number>(0);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const response = await fetch('https://dummyjson.com/products/category-list');
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
				const data = await response.json();

				setProducts(data.products);
				setTotalProducts(data.total);
			} catch (error) {
				console.error('Fetch Error:', error);
			}
		};

		uploadProducts();
	}, [currentPage, activeCategory, debouncedSearchQuery]);

	return {
		products,
		setProducts,
		categories,
		setCategories,
		searchQuery,
		setSearchQuery,
		currentPage,
		setCurrentPage,
		selectedImage,
		setSelectedImage,
		activeCategory,
		setActiveCategory,
		totalProducts,
		setTotalProducts,
		productsOnPage,
	};
};

export default useProducts;
