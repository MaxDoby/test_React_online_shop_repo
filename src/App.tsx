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
];

function App() {
  // Aici vom avea logica noastra
  return (
    <div>
      <h1>Primul meu Magazin</h1>
    </div>
  )
}


export default App;