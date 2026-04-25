interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
}

interface ProductsOnPage {
    productsToShow: Product[];
    addToCart: () => void;
    setSelectedImage: (img: string | null) => void;
}

export const ProductsOnPage = ({ productsToShow, addToCart, setSelectedImage }: ProductsOnPage) => {
    return (
        <main className="product-grid">
            {productsToShow.map((product) => (
                <article key={product.id} className="product-card">
                    <div className="card-glass"></div>
                    <img src={product.thumbnail} alt={product.title} onClick={ () => {
                        console.log("Imagine click-uită:", product.title);
                        setSelectedImage(product.thumbnail)}} />
                    <h3>{product.title}</h3>
                    <p className="category">{product.category}</p>
                    <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span className="price" style={{ fontWeight: 'bold', color: 'var(--apricot)' }}>
                            {product.price} Lei
                        </span>
                        <button className="btn-add" onClick={addToCart}>
                            +
                        </button>
                    </div>
                </article>
            ))}
        </main>
    );
};
