export const calculatePagination = (filteredProductsAfterSearch: any[], currentPage: number) => {
    // Logica ta pentru Paginare
    const productsOnPage = 9;
    const lastProduct = currentPage * productsOnPage;
    const firstProduct = lastProduct - productsOnPage;

    const productsToShow = filteredProductsAfterSearch.slice(firstProduct, lastProduct);
    const totalPages = Math.ceil(filteredProductsAfterSearch.length / productsOnPage);

    return { productsToShow, totalPages };
};
