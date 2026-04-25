const addCart = (cartCount: number, setCartCount: (val: number) => void) => {
	setCartCount(cartCount + 1);
};

export default addCart;
