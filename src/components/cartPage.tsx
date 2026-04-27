import type { CartItem } from '../hooks/useAppState';

interface CartPageProps {
    cartItems: CartItem[];
    cartTotal: number;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    checkout: () => void;
    openShop: () => void;
    increaseCartItemQuantity: (productId: number) => void;
    decreaseCartItemQuantity: (productId: number) => void;
}

const CartPage = ({
	cartItems,
	cartTotal,
	removeFromCart,
	clearCart,
	checkout,
	openShop,
	increaseCartItemQuantity,
	decreaseCartItemQuantity,
}: CartPageProps) => (
	<section className="cart-page">
		<div className="cart-page-header">
			<h2>Coșul meu</h2>
			<button type="button" className="btn-filter" onClick={openShop}>
				Înapoi la produse
			</button>
		</div>

		{cartItems.length === 0 ? (
			<p>Coșul este gol.</p>
        ) : (
	<>
		<div className="cart-list">
			{cartItems.map((item) => (
				<article key={item.id} className="cart-item">
					<img src={item.thumbnail} alt={item.title} className="cart-item-image" />
					<div className="cart-item-info">
						<h3>{item.title}</h3>
						<p>Categorie: {item.category}</p>
						<p>Cantitate: {item.quantity}</p>
						<div className="cart-quantity-controls">
							<button type="button" className="btn-filter" onClick={() => decreaseCartItemQuantity(item.id)}>
								-
							</button>

							<span className="cart-quantity-value">{item.quantity}</span>

							<button type="button" className="btn-filter" onClick={() => increaseCartItemQuantity(item.id)}>
								+
							</button>
						</div>

						<p>Subtotal: {(item.price * item.quantity).toFixed(2)} Lei</p>
					</div>

					<button type="button" className="btn-filter" onClick={() => removeFromCart(item.id)}>
						Șterge
					</button>
				</article>
                    ))}
		</div>

		<div className="cart-summary">
			<h3>Total: {cartTotal.toFixed(2)} Lei</h3>

			<div className="cart-actions">
				<button type="button" className="btn-filter" onClick={clearCart}>
					Golește coșul
				</button>

				<button type="button" className="btn-add" onClick={checkout}>
					Checkout
				</button>
			</div>
		</div>
	</>
        )}
	</section>
);

export default CartPage;
