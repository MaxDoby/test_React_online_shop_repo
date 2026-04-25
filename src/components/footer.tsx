// Definim ce date primeste Footer-ul
interface FooterProps {
    cartCount: number; // Numărul total de produse din coș
}

const Footer = ({ cartCount }: FooterProps) => (
	<footer style={{
          marginTop: '30px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px',
        }}>
		<h3>🛒 Produse în coș: {cartCount}</h3>
	</footer>
);

export default Footer;
