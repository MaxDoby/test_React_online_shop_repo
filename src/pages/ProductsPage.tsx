import FilterNav from '../components/FilterNav';
import ProductsOnPage from '../components/ProductList';
import type { Product } from '../hooks/useProducts.ts';

interface ProductsPageProps {
	categories: string[];
	filterProducts: (cat: string) => void;
	products: Product[];
	addToCart: (product: Product) => void;
	setSelectedImage: (image: string | null) => void;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	totalPages: number;
}

const ProductsPage = ({
	categories,
	filterProducts,
	products,
	addToCart,
	setSelectedImage,
	currentPage,
	setCurrentPage,
	totalPages,
}: ProductsPageProps) => (
	<div className="main-layout">
		<aside className="sidebar">
			<h3 className="sidebar-title">Categorii</h3>
			<FilterNav categories={categories} filterProducts={filterProducts} />
		</aside>

		<main className="content-area">
			<ProductsOnPage productsToShow={products} addToCart={addToCart} setSelectedImage={setSelectedImage} />

			<div className="pagination-container">
				<button type="button" className="btn-filter" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
					Înapoi
				</button>

				<span className="page-info">
					Pagina {currentPage} din {totalPages || 1}
				</span>

				<button type="button" className="btn-filter" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
					Înainte
				</button>
			</div>
		</main>
	</div>
);

export default ProductsPage;
