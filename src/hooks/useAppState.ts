import { useState } from 'react';

interface Produs {
    id: number;
    nume: string;
    pret: number;
    categorie: string;
    imagine: string;
}

export const useAppState = (PRODUSE_MOCK: Produs[]) => {
    // 1. Stările aplicației (Memoria) - STRICT după codul tău
    const [produse, setProduse] = useState<Produs[]>(PRODUSE_MOCK);
    const [cosCount, setCosCount] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [paginaCurenta, setPaginaCurenta] = useState<number>(1);
    const [imagineSelectata, setImagineSelectata] = useState<string | null>(null);

    return {
        produse, setProduse,
        cosCount, setCosCount,
        searchQuery, setSearchQuery,
        paginaCurenta, setPaginaCurenta,
        imagineSelectata, setImagineSelectata,
    };
};