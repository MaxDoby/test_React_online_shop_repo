
interface Produs {
    id: number;
    nume: string;
    pret: number;
    categorie: string;
    imagine: string;
}

export const filtreazaDupaSearch = (produse: Produs[], searchQuery: string) => {
    // 2. Filtrare și Logică (partea de search)
    return produse.filter((p) => p.nume.toLowerCase().includes(searchQuery.toLowerCase()));
};

export const logicFiltreazaProduse = (cat: string, PRODUSE_MOCK: Produs[], setProduse: any, setPaginaCurenta: any) => {
    // Funcția ta originală de filtrare
    if (cat === 'Toate') {
        setProduse(PRODUSE_MOCK);
    } else {
        setProduse(PRODUSE_MOCK.filter((p) => p.categorie === cat));
    }
    setPaginaCurenta(1);
};