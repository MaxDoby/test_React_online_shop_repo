import './App.css';

import {
	Navigate, Routes, Route, useNavigate,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage.tsx';
import useAuth from './hooks/useAuth.ts';

import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import NewsTicker from './components/NewsTicker.tsx';
import SearchCont from './components/SearchCont.tsx';
import CartPage from './pages/CartPage.tsx';
import ProductsPage from './pages/ProductsPage.tsx';

import useProducts from './hooks/useProducts.ts';
import useCart from './hooks/useCart.ts';

import logicFilterProducts from './utils/productFilters.ts';
import calculatePagination from './utils/pagination.ts';

const App = () => {
	const navigate = useNavigate();

	const productsState = useProducts();
	const authState = useAuth();
	const cartState = useCart(authState.authUser?.id ?? null);

	const {
		products,
		categories,
		searchQuery,
		setSearchQuery,
		currentPage,
		setCurrentPage,
		selectedImage,
		setSelectedImage,
		setActiveCategory,
		totalProducts,
		productsOnPage,
	} = productsState;

	const {
		cartItems,
		cartTotal,
		cartCount,
		addToCart,
		removeFromCart,
		clearCart,
		checkout,
		increaseCartItemQuantity,
		decreaseCartItemQuantity,
		orderHistory,
	} = cartState;

	const {
		login,
		logout,
		isAuthenticated,
		authUser,
		registerLocal,
	} = authState;

	// Filtrare si Logica
	const filterProducts = (cat: string) => {
		logicFilterProducts(cat, setActiveCategory, setCurrentPage, setSearchQuery);
	};

	// Logica pentru Paginare
	const { totalPages } = calculatePagination(totalProducts, productsOnPage);

	return (
		<div className="app-container">
			{/* Background animat */}
			<div className="bg-animated" />

			<Header
				cartCount={cartCount}
				openCart={() => navigate('/cart')}
				openShop={() => navigate('/products')}
				openAuth={() => navigate('/auth')}
				logout={logout}
				isAuthenticated={isAuthenticated}
				authUsername={authUser?.username || null}
            />

			{/* Componenta NewsTicker sub Header */}
			<NewsTicker />

			<SearchCont searchQuery={searchQuery} setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />

			{/* NOU: Layout principal cu doua coloane */}
			<Routes>
				<Route
					path="/products"
					element={(
						<ProductsPage
							categories={categories}
							filterProducts={filterProducts}
							products={products}
							addToCart={addToCart}
							setSelectedImage={setSelectedImage}
							currentPage={currentPage}
							totalPages={totalPages}
							setCurrentPage={setCurrentPage}
                        />
                      )}
                />
				<Route
					path="/cart"
					element={(
						<CartPage
							cartItems={cartItems}
							cartTotal={cartTotal}
							removeFromCart={removeFromCart}
							clearCart={clearCart}
							increaseCartItemQuantity={increaseCartItemQuantity}
							decreaseCartItemQuantity={decreaseCartItemQuantity}
							orderHistory={orderHistory}
							openShop={() => navigate('/products')}
							checkout={() => {
                                if (!isAuthenticated) {
                                    alert('Autentificati-va sau creati un cont pentru a plasa comanda.');
                                    navigate('/auth');
                                    return;
                                }

                                checkout();
                                navigate('/products');
                            }}
                        />
                      )}
                />
				<Route
					path="/auth"
					element={(
						<AuthPage
							login={async (username, password) => {
                                await login(username, password);
                                navigate('/products');
                            }}
							registerLocal={async (username, password, email, firstName, lastName) => {
                                await registerLocal(username, password, email, firstName, lastName);
                                navigate('/products');
                            }}
							isAuthenticated={isAuthenticated}
                        />
                      )}
                />

				<Route path="*" element={<Navigate to="/products" replace />} />
			</Routes>

			<Footer />

			{selectedImage && (
			<button type="button" className="modal-overlay" onClick={() => setSelectedImage(null)} aria-label="Închide imaginea">
				<span className="modal-content">
					<img src={selectedImage} alt="Preview" />
				</span>
			</button>
            )}
		</div>
	);
};

export default App;
