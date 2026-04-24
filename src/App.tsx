import './App.css';
import { ProdusePePagina } from './components/productList.tsx';
import { Footer } from './components/footer.tsx'
import { Header } from './components/header.tsx'
import { FilterNav } from './components/filterNav.tsx';
import { useAppState } from './hooks/useAppState.ts';
import { filtreazaDupaSearch, logicFiltreazaProduse } from './utils/useFilter.ts';
import { calculeazaPaginarea } from './utils/usePagination.ts';
import { adaugaInCos as adaugaCos } from './utils/useCosCount.ts';
import { NewsTicker } from './components/newsTicker.tsx';

// Definim o Interfata pentru produsul nostru

interface Produs {
    id: number;
    nume: string;
    pret: number;
    categorie: string;
    imagine: string;
}

function App() {
    const state = useAppState();

    const {
        produse,
        setProduse,
        cosCount,
        setCosCount,
        searchQuery,
        setSearchQuery,
        paginaCurenta,
        setPaginaCurenta,
        imagineSelectata,
        setImagineSelectata,
    } = state;

    // Filtrare și Logică
    const produseFiltrateDupaSearch = filtreazaDupaSearch(produse, searchQuery);
    const filtreazaProduse = (cat: string) => {
        logicFiltreazaProduse(cat, setProduse, setPaginaCurenta);
    };

    // Logica pentru Paginare
    const { produseDeAfisat, totalPagini } = calculeazaPaginarea(produseFiltrateDupaSearch, paginaCurenta);

    const adaugaInCos = () => {
        // Chemăm logica externă și îi dăm starea actuală și funcția de modificare
        adaugaCos(cosCount, setCosCount);
    };
    const categoriiDinamice = ['Toate', ...Array.from(new Set(produse.map((p) => p.categorie)))];

    return (
        <div className="app-container">
            {/* Background animat */}
            <div className="bg-animated">{/* ... blob-urile tale ... */}</div>

            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPaginaCurenta={setPaginaCurenta} />

            {/* Componenta NewsTicker sub Header */}
            <NewsTicker />

            {/* NOU: Layout principal cu doua coloane */}
            <div className="main-layout">
                {/* Coloana Stanga: Sidebar pentru Filtre */}
                <aside className="sidebar">
                    <h3 className="sidebar-title">Categorii</h3>
                    <FilterNav categorii={categoriiDinamice} filtreazaProduse={filtreazaProduse} />
                </aside>

                {/* Coloana Dreapta: Produse si Paginare */}
                <main className="content-area">
                    <ProdusePePagina produseDeAfisat={produseDeAfisat} adaugaInCos={adaugaInCos} setImagineSelectata={setImagineSelectata} />

                    <div className="pagination-container">
                        <button className="btn-filter" disabled={paginaCurenta === 1} onClick={() => setPaginaCurenta(paginaCurenta - 1)}>
                            Înapoi
                        </button>
                        <span>
                            {' '}
                            Pagina {paginaCurenta} din {totalPagini || 1}{' '}
                        </span>
                        <button
                            className="btn-filter"
                            disabled={paginaCurenta === totalPagini || totalPagini === 0}
                            onClick={() => setPaginaCurenta(paginaCurenta + 1)}
                        >
                            Înainte
                        </button>
                    </div>
                </main>
            </div>

            <Footer cosCount={cosCount} />

            {imagineSelectata && (
                <div className="modal-overlay" onClick={() => setImagineSelectata(null)}>
                    <div className="modal-content">
                        <img src={imagineSelectata} alt="Preview" />
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default App;
