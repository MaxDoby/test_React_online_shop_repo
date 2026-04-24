import { useState, useEffect } from 'react';

interface Produs {
    id: number;
    nume: string;
    pret: number;
    categorie: string;
    imagine: string;
}

export const useAppState = () => {
    // 1. Stările aplicației (Memoria) - STRICT după codul tău
    const [produse, setProduse] = useState<Produs[]>([]);
    const [cosCount, setCosCount] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [paginaCurenta, setPaginaCurenta] = useState<number>(1);
    const [imagineSelectata, setImagineSelectata] = useState<string | null>(null);

    useEffect(() => {
        const incarcaProduse = async () => {
            try {
                const raspuns = await fetch('https://dummyjson.com/products?limit=100');
                if (!raspuns.ok) throw new Error('Eroare la server!');
                const date = await raspuns.json();

                //Traducem datele primit de la server
                const produseTraduse = date.products.map((p:any) => ({
                    id: p.id,
                    nume: p.title,
                    pret: p.price,
                    categorie: p.category,
                    imagine: p.thumbnail
                }))

                setProduse(produseTraduse);
            } catch (error) {
                console.error('Eroare fetch:', error)
            }
        }

        incarcaProduse();
    }, [])
    

    return {
        produse, setProduse,
        cosCount, setCosCount,
        searchQuery, setSearchQuery,
        paginaCurenta, setPaginaCurenta,
        imagineSelectata, setImagineSelectata,
    };
};