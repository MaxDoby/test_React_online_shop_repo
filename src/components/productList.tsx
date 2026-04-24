interface Produs {
    id: number;
    nume: string;
    pret: number;
    categorie: string;
    imagine: string;
}

interface ProdusePePaginaProps {
    produseDeAfisat: Produs[];
    adaugaInCos: () => void;
    setImagineSelectata: (img: string | null) => void;
}

export const ProdusePePagina = ({ produseDeAfisat, adaugaInCos, setImagineSelectata }: ProdusePePaginaProps) => {
    return (
        <main className="product-grid">
            {produseDeAfisat.map((produs) => (
                <article key={produs.id} className="product-card">
                    <div className="card-glass"></div>
                    <img src={produs.imagine} alt={produs.nume} onClick={ () => {
                        console.log("Imagine click-uită:", produs.nume);
                        setImagineSelectata(produs.imagine)}} />
                    <h3>{produs.nume}</h3>
                    <p className="category">{produs.categorie}</p>
                    <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span className="price" style={{ fontWeight: 'bold', color: 'var(--apricot)' }}>
                            {produs.pret} Lei
                        </span>
                        <button className="btn-add" onClick={adaugaInCos}>
                            +
                        </button>
                    </div>
                </article>
            ))}
        </main>
    );
};
