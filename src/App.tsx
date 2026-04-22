import { useState } from "react";



// Definim o Interfata pentru produsul nostru


interface Produs {
  id: number;
  nume: string;
  pret: number;
  categorie: string;
  imagine: string;
}

const PRODUSE_MOCK: Produs[] = [
    { id: 1, nume: 'Laptop Gaming', pret: 4500, categorie: 'Laptop', imagine: 'https://via.placeholder.com/150' },
    { id: 2, nume: 'Mouse Vertical', pret: 750, categorie: 'Mouse', imagine: 'https://via.placeholder.com/150' },
    { id: 3, nume: 'Tastatura Gaming', pret: 835, categorie: 'Tastatura', imagine: 'https://via.placeholder.com/150' },
    { id: 4, nume: 'Casti SONY', pret: 1750, categorie: 'Casti', imagine: 'https://via.placeholder.com/150' },
    { id: 5, nume: 'Camera WEB Digit', pret: 450, categorie: 'Camera', imagine: 'https://via.placeholder.com/150' },
    { id: 6, nume: 'Cablu HDMI', pret: 350, categorie: 'Cabluri', imagine: 'https://via.placeholder.com/150' },
    { id: 7, nume: 'Boxe Sven', pret: 1500, categorie: 'Boxe', imagine: 'https://via.placeholder.com/150' },
    { id: 8, nume: 'Laptop Apple', pret: 19750, categorie: 'Laptop', imagine: 'https://via.placeholder.com/150' },
    { id: 9, nume: 'IPAD Air', pret: 14500, categorie: 'IPAD', imagine: 'https://via.placeholder.com/150' },
    { id: 10, nume: 'Boxe DolbySurr', pret: 6750, categorie: 'Boxe', imagine: 'https://via.placeholder.com/150' },
    { id: 11, nume: 'Mouse X-Ray', pret: 950, categorie: 'Mouse', imagine: 'https://via.placeholder.com/150' },
    { id: 12, nume: 'Tastatura RoboX', pret: 1750, categorie: 'Tastatura', imagine: 'https://via.placeholder.com/150' },
    { id: 13, nume: 'Montor LG Widescr', pret: 8500, categorie: 'Montor', imagine: 'https://via.placeholder.com/150' },
    { id: 14, nume: 'Monitor Samsung', pret: 9750, categorie: 'Montor', imagine: 'https://via.placeholder.com/150' },
    { id: 15, nume: 'Televizor Philips', pret: 14500, categorie: 'Televizor', imagine: 'https://via.placeholder.com/150' },
    { id: 16, nume: 'Televizor Sony', pret: 17500, categorie: 'Televizor', imagine: 'https://via.placeholder.com/150' },
];

function App() {
  // Aici vom avea logica noastra
  const [produse, setProduse] = useState<Produs[]>(PRODUSE_MOCK);
  const [cosCount, setCosCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(''); //Starea pentru textul cautat
   // Filtram lista curenta in dupa input, aplicam toLowerCase ca sa nu ne afecteze majusculele
  const produseFiltrateDupaSearch = produse.filter(p => p.nume.toLowerCase().includes(searchQuery.toLowerCase()))
  const [paginaCurenta, setPaginaCurenta] = useState<number>(1);
  

  const produsePePagina = 4;
  const ultimulProdus = paginaCurenta * produsePePagina
  const primulProdus = ultimulProdus - produsePePagina
  const produseDeAfisat = produseFiltrateDupaSearch.slice(primulProdus, ultimulProdus)
  const totalPagini = Math.ceil(produseFiltrateDupaSearch.length / produsePePagina);

  const adaugaInCos = () => {
    setCosCount(cosCount + 1)
  }
  // Functia de filtrare
  const filtreazaProduse = (cat: string) => {
    if (cat === 'Toate') {
      setProduse(PRODUSE_MOCK) // Resetam lista originala
    } else {
      const filtrate = PRODUSE_MOCK.filter(p => p.categorie === cat);
      setProduse(filtrate)
    }
  }

  return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
          <h1>Primul meu Magazin</h1>
          {/* Inputul de cautare */}
          <input type="text" placeholder="Cauta produsul..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          // Actualizam state-ul la fiecare tasta
          {/* Butoane de filtrare */}
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
              <button onClick={() => filtreazaProduse('Toate')}>Toate</button>
              <button onClick={() => filtreazaProduse('Laptop')}>Laptopuri</button>
              <button onClick={() => filtreazaProduse('Mouse')}>Mouse-uri</button>
          </div>
          {/* Grid pentru produse*/}
          <div
              style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '20px',
              }}
          >
              {produseDeAfisat.map((produs) => (
                  <div
                      key={produs.id}
                      style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          borderRadius: '8px',
                      }}
                  >
                      <img src={produs.imagine} alt={produs.nume} style={{ width: '100%' }} />
                      <h3>{produs.nume}</h3>
                      <p>Categorie: {produs.categorie}</p>
                      <p>
                          <strong>Pret: {produs.pret} Lei</strong>
                      </p>
                      <button onClick={adaugaInCos}>Adauga in cos</button>
                  </div>
              ))}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              {/* Buton Inapoi */}
              <button disabled={paginaCurenta === 1} onClick={() => setPaginaCurenta(paginaCurenta - 1)}>
                  Înapoi
              </button>

              <span>
                  Pagina {paginaCurenta} din {totalPagini}
              </span>

              {/* Buton Inainte */}
              <button disabled={paginaCurenta === totalPagini} onClick={() => setPaginaCurenta(paginaCurenta + 1)}>
                  Înainte
              </button>
          </div>

          <h3>Produse in cos: {cosCount}</h3>
      </div>
  );
}


export default App;