// Definim ce date primeste Footer-ul
interface FooterProps {
    cosCount: number; // Numărul total de produse din coș
}

export const Footer = ({cosCount}: FooterProps) => {
    return (
        <footer style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <h3>🛒 Produse în coș: {cosCount}</h3>
        </footer>
    );
}
