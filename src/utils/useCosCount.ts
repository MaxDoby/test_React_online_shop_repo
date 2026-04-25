export const addToCart = (cartCount: number, setCartCount: (val: number) => void) => {
    setCartCount(cartCount + 1);
};