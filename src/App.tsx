import './App.css';
import { ProductsOnPage } from './components/productList.tsx';
import { Footer } from './components/footer.tsx'
import { Header } from './components/header.tsx'
import { FilterNav } from './components/filterNav.tsx';
import { useAppState } from './hooks/useAppState.ts';
import { filterAfterSearch, logicFilterProducts } from './utils/useFilter.ts';
import { calculatePagination } from './utils/usePagination.ts';
import { addToCart as addCart, addToCart } from './utils/useCosCount.ts';
import { NewsTicker } from './components/newsTicker.tsx';

function App() {
    const state = useAppState();

    const {
        products,
        setProducts,
        cartCount,
        setCartCount,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        selectedImage,
        setSelectedImage,
    } = state;

    // Filtrare și Logică
    const filteredProductsAfterSearch = filterAfterSearch(products, searchQuery);
    const filterProducts = (cat: string) => {
        logicFilterProducts(cat, setProducts, setCurrentPage);
    };

    // Logica pentru Paginare
    const { productsToShow, totalPages } = calculatePagination(filteredProductsAfterSearch, currentPage);

    const addToCart = () => {
        // Chemăm logica externă și îi dăm starea actuală și funcția de modificare
        addCart(cartCount, setCartCount);
    };
    const dinamicCategories = ['Toate', ...Array.from(new Set(products.map((p) => p.category)))];

    return (
        <div className="app-container">
            {/* Background animat */}
            <div className="bg-animated">{/* ... blob-urile tale ... */}</div>

            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />

            {/* Componenta NewsTicker sub Header */}
            <NewsTicker />

            {/* NOU: Layout principal cu doua coloane */}
            <div className="main-layout">
                {/* Coloana Stanga: Sidebar pentru Filtre */}
                <aside className="sidebar">
                    <h3 className="sidebar-title">Categorii</h3>
                    <FilterNav categories={dinamicCategories} filterProducts={filterProducts} />
                </aside>

                {/* Coloana Dreapta: Produse si Paginare */}
                <main className="content-area">
                    <ProductsOnPage productsToShow={productsToShow} addToCart={addToCart} setSelectedImage={setSelectedImage} />

                    <div className="pagination-container">
                        <button className="btn-filter" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                            Înapoi
                        </button>
                        <span>
                            {' '}
                            Pagina {currentPage} din {totalPages || 1}{' '}
                        </span>
                        <button
                            className="btn-filter"
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Înainte
                        </button>
                    </div>
                </main>
            </div>

            <Footer cartCount={cartCount} />

            {selectedImage && (
                <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Preview" />
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default App;
