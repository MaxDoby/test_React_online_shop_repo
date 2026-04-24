import './App.css';
import { useState } from 'react';
import { ProdusePePagina } from './components/productList.tsx';
import { Footer } from './components/footer.tsx'
import { Header } from './components/header.tsx'
import { FilterNav } from './components/filterNav.tsx';

// Definim o Interfata pentru produsul nostru
interface Produs {
    id: number;
    nume: string;
    pret: number;
    categorie: string;
    imagine: string;
}

const PRODUSE_MOCK: Produs[] = [
    { id: 1, nume: 'Laptop Gaming', pret: 4500, categorie: 'Laptop', imagine: '/img/Laptop_Gaming.jpg' },
    { id: 2, nume: 'Mouse Vertical', pret: 750, categorie: 'Mouse', imagine: '/img/Mouse1.jpg' },
    { id: 3, nume: 'Tastatura Gaming', pret: 835, categorie: 'Tastatura', imagine: '/img/Tast2.jpg' },
    { id: 4, nume: 'Casti SONY', pret: 1750, categorie: 'Casti', imagine: '/img/CastiSony.jpg' },
    { id: 5, nume: 'Camera WEB Digit', pret: 450, categorie: 'Camera', imagine: '/img/WebCam.jpg' },
    { id: 6, nume: 'Cablu HDMI', pret: 350, categorie: 'Cabluri', imagine: '/img/HDMI.webp' },
    { id: 7, nume: 'Boxe Sven', pret: 1500, categorie: 'Boxe', imagine: '/img/boxe_1.jpg' },
    { id: 8, nume: 'Laptop Apple', pret: 19750, categorie: 'Laptop', imagine: '/img/Laptop_Apple.jpg' },
    { id: 9, nume: 'IPAD Air', pret: 14500, categorie: 'IPAD', imagine: '/img/IPAD.webp' },
    { id: 10, nume: 'Boxe DolbySurr', pret: 6750, categorie: 'Boxe', imagine: '/img/boxe_2.jpg' },
    { id: 11, nume: 'Mouse X-Ray', pret: 950, categorie: 'Mouse', imagine: '/img/MouseLogit.jpg' },
    { id: 12, nume: 'Tastatura RoboX', pret: 1750, categorie: 'Tastatura', imagine: '/img/Tast1.jpg' },
    { id: 13, nume: 'Monitor LG Widescr', pret: 8500, categorie: 'Monitor', imagine: '/img/Monitor_LG.jpg' },
    { id: 14, nume: 'Monitor Samsung', pret: 9750, categorie: 'Monitor', imagine: '/img/Monitor_Samsung.jpg' },
    { id: 15, nume: 'Televizor Philips', pret: 14500, categorie: 'Televizor', imagine: '/img/TV2.jpg' },
    { id: 16, nume: 'Televizor Sony', pret: 17500, categorie: 'Televizor', imagine: '/img/SonyTV.jpg' },
];

const categorii = ['Toate', 'Laptop', 'Mouse', 'Tastatura', 'Monitor', 'Boxe', 'Casti'];
function App() {
    // 1. Stările aplicației (Memoria)
    const [produse, setProduse] = useState<Produs[]>(PRODUSE_MOCK);
    const [cosCount, setCosCount] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>(''); // Starea pentru textul căutat
    const [paginaCurenta, setPaginaCurenta] = useState<number>(1);
    const [imagineSelectata, setImagineSelectata] = useState<string | null>(null);

    // 2. Filtrare și Logică
    // Filtram lista curentă după input, aplicăm toLowerCase
    const produseFiltrateDupaSearch = produse.filter((p) => p.nume.toLowerCase().includes(searchQuery.toLowerCase()));

    // Logica pentru Paginare
    const produsePePagina = 8;
    const ultimulProdus = paginaCurenta * produsePePagina;
    const primulProdus = ultimulProdus - produsePePagina;
    const produseDeAfisat = produseFiltrateDupaSearch.slice(primulProdus, ultimulProdus);
    const totalPagini = Math.ceil(produseFiltrateDupaSearch.length / produsePePagina);

    // 3. Funcții

      const adaugaInCos = () => {
          setCosCount(cosCount + 1);
      };

    const filtreazaProduse = (cat: string) => {
        if (cat === 'Toate') {
            setProduse(PRODUSE_MOCK); // Resetăm la lista originală
        } else {
            setProduse(PRODUSE_MOCK.filter((p) => p.categorie === cat));
        }
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
