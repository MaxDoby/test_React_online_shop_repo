export const calculeazaPaginarea = (produseFiltrateDupaSearch: any[], paginaCurenta: number) => {
    // Logica ta pentru Paginare
    const produsePePagina = 8;
    const ultimulProdus = paginaCurenta * produsePePagina;
    const primulProdus = ultimulProdus - produsePePagina;

    const produseDeAfisat = produseFiltrateDupaSearch.slice(primulProdus, ultimulProdus);
    const totalPagini = Math.ceil(produseFiltrateDupaSearch.length / produsePePagina);

    return { produseDeAfisat, totalPagini };
};
