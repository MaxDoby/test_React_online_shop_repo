import { useState, useEffect } from 'react';
import {
	logicAddToCart,
	logicRemoveFromCart,
	logicClearCart,
	logicIncreaseCartItemQuantity,
	logicDecreaseCartItemQuantity,
} from '../utils/cartActions.ts';
import type { Product } from './useProducts.ts';

export interface CartItem extends Product {
    quantity: number;
}

const cartStorageKey = 'mini-shop-cart';

const useCart = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isCartLoaded, setIsCartLoaded] = useState<boolean>(false);

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
	};

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

	const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return {
		cartItems,
		setCartItems,
		cartCount,
		addToCart,
		cartTotal,
		removeFromCart,
		clearCart,
		checkout,
		increaseCartItemQuantity,
		decreaseCartItemQuantity,
	};
};

export default useCart;
