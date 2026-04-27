import './App.css';
import ProductsOnPage from './components/productList.tsx';
import Footer from './components/footer.tsx';
import Header from './components/header.tsx';
import FilterNav from './components/filterNav.tsx';
import useAppState from './hooks/useAppState.ts';
import logicFilterProducts from './utils/useFilter.ts';
import calculatePagination from './utils/usePagination.ts';
import NewsTicker from './components/newsTicker.tsx';
import SearchCont from './components/searchCont.tsx';
import CartPage from './components/cartPage.tsx';

const App = () => {
	const state = useAppState();

	const {
		products,
		categories,
		cartCount,
		addToCart,
		searchQuery,
		setSearchQuery,
		currentPage,
		setCurrentPage,
		selectedImage,
		setSelectedImage,
		setActiveCategory,
		totalProducts,
		productsOnPage,
		cartItems,
		cartTotal,
		currentView,
		setCurrentView,
		removeFromCart,
		clearCart,
		checkout,
		increaseCartItemQuantity,
		decreaseCartItemQuantity,
	} = state;

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
						<ProductsOnPage
							productsToShow={products}
							addToCart={addToCart}
							setSelectedImage={setSelectedImage}
						/>

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
		checkout={checkout}
		increaseCartItemQuantity={increaseCartItemQuantity}
		decreaseCartItemQuantity={decreaseCartItemQuantity}
		openShop={() => setCurrentView('shop')}
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
