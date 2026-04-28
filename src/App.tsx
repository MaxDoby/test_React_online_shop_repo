import './App.css';
import ProductsOnPage from './components/ProductList.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import FilterNav from './components/FilterNav.tsx';
import useProducts from './hooks/useProducts.ts';
import logicFilterProducts from './utils/productFilters.ts';
import calculatePagination from './utils/pagination.ts';
import NewsTicker from './components/NewsTicker.tsx';
import SearchCont from './components/SearchCont.tsx';
import CartPage from './pages/CartPage.tsx';
import useCart from './hooks/useCart.ts';

const App = () => {
	const productsState = useProducts();
	const cartState = useCart();

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
		currentView,
		setCurrentView,
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
	} = cartState;

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

			<Header cartCount={cartCount} openCart={() => setCurrentView('cart')} openShop={() => setCurrentView('shop')} />

			{/* Componenta NewsTicker sub Header */}
			<NewsTicker />

			<SearchCont searchQuery={searchQuery} setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />

			{/* NOU: Layout principal cu doua coloane */}
			{currentView === 'shop' ? (
				<div className="main-layout">
					<aside className="sidebar">
						<h3 className="sidebar-title">Categorii</h3>
						<FilterNav categories={categories} filterProducts={filterProducts} />
					</aside>

					<main className="content-area">
						<ProductsOnPage productsToShow={products} addToCart={addToCart} setSelectedImage={setSelectedImage} />

						<div className="pagination-container">
							<button type="button" className="btn-filter" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
								Înapoi
							</button>

							<span>
								Pagina {currentPage} din {totalPages || 1}
							</span>

							<button
								type="button"
								className="btn-filter"
								disabled={currentPage === totalPages || totalPages === 0}
								onClick={() => setCurrentPage(currentPage + 1)}
                            >
								Înainte
							</button>
						</div>
					</main>
				</div>
            ) : (
	<CartPage
		cartItems={cartItems}
		cartTotal={cartTotal}
		removeFromCart={removeFromCart}
		clearCart={clearCart}
		increaseCartItemQuantity={increaseCartItemQuantity}
		decreaseCartItemQuantity={decreaseCartItemQuantity}
		openShop={() => setCurrentView('shop')}
		checkout={() => {
                        checkout();
                        setCurrentView('shop');
                    }}
                />
            )}

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
