import './App.css';
import { ProdusePePagina } from './components/productList.tsx';
import { Footer } from './components/footer.tsx'
import { Header } from './components/header.tsx'
import { FilterNav } from './components/filterNav.tsx';
import { useAppState } from './hooks/useAppState.ts';
import { filtreazaDupaSearch, logicFiltreazaProduse } from './utils/useFilter.ts';
import { calculeazaPaginarea } from './utils/usePagination.ts';
import { adaugaInCos as adaugaCos } from './utils/useCosCount.ts';

// Definim o Interfata pentru produsul nostru

interface Produs {
    id: number;
    nume: string;
    pret: number;
    categorie: string;
    imagine: string;
}



const categorii = ['Toate', 'Laptops', 'Mobile-accessories', 'Tablets', 'Smartphones'];


function App() {
    const state = useAppState() 
    
    const { 
        produse, setProduse, 
        cosCount, setCosCount, 
        searchQuery, setSearchQuery, 
        paginaCurenta, setPaginaCurenta, 
        imagineSelectata, setImagineSelectata 
    } = state;

    // Filtrare și Logică
    const produseFiltrateDupaSearch = filtreazaDupaSearch(produse, searchQuery);
    const filtreazaProduse = (cat: string) => {
        logicFiltreazaProduse(cat, setProduse, setPaginaCurenta);
    };

    // Logica pentru Paginare
    const { produseDeAfisat, totalPagini} = calculeazaPaginarea(produseFiltrateDupaSearch, paginaCurenta)

   const adaugaInCos = () => {
    // Chemăm logica externă și îi dăm starea actuală și funcția de modificare
    adaugaCos(cosCount, setCosCount);
}; 

    

    return (
        <div className="app-container">
            <div className="bg-animated">
                <div className="blob" style={{ width: '600px', height: '600px', background: 'var(--apricot)', top: '-10%', left: '20%' }}></div>
                <div
                    className="blob"
                    style={{ width: '500px', height: '500px', background: '#4a4ae2', bottom: '-10%', right: '10%', animationDelay: '-5s' }}
                ></div>
            </div>

            <Header
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPaginaCurenta={setPaginaCurenta}
            />

            <FilterNav
            categorii={categorii}
            filtreazaProduse={filtreazaProduse}
            />

            <ProdusePePagina produseDeAfisat={produseDeAfisat} adaugaInCos={adaugaInCos} setImagineSelectata={setImagineSelectata} />

            <div
                className="pagination-container"
                style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}
            >
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

            <Footer
            cosCount={cosCount}
            />

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
