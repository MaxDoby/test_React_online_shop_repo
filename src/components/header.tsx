interface HeaderProps {
    cartCount: number;
    openCart: () => void;
    openShop: () => void;
}

const Header = ({ cartCount, openCart, openShop }: HeaderProps) => (
	<header className="header">
		<button type="button" className="logo-link header-reset-button" onClick={openShop}>
			<div className="logo">
				<span className="logo-icon">⚡</span>
				Tech
				<span>Flow</span>
			</div>
		</button>

		<div className="cart-indicator">
			<button type="button" className="cart-icon-button header-reset-button" onClick={openCart} aria-label="Deschide coșul">
				<span className="cart-icon">🛒</span>
			</button>

			<span>Checkout:</span>
			<span className="cart-count">{cartCount}</span>
		</div>
	</header>
);

export default Header;
