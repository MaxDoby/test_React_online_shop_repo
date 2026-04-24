
export const filtreazaDupaSearch = (produse: any[], searchQuery: string) => {
    return produse.filter((p) => 
        p.nume.toLowerCase().includes(searchQuery.toLowerCase())
    );
};


export const logicFiltreazaProduse = async (cat: string, setProduse: any, setPaginaCurenta: any) => {
    try{
        let url = 'https:dummyjson.com/products?limit=100';
        if (cat !== 'Toate') {
            url = `https://dummyjson.com/products/category/${cat.toLowerCase()}`;
        }

        const raspuns = await fetch(url);
        if (!raspuns.ok) throw new Error('Eroare la filtrare')

        const date = await raspuns.json();
        // Aplicam si aici traducerea cheielor
        const produseTraduse = date.products.map( (p:any) => ({
            id: p.id,
            nume: p.title,
            pret: p.price,
            categorie: p.category,
            imagine: p.thumbnail
        }) );

        setProduse(produseTraduse);
        setPaginaCurenta(1);
    } catch (error) {
        console.error('Eroare filtrare:', error)
    }

        }
    
