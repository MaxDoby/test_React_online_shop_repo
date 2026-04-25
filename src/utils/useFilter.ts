export const filterAfterSearch = (products: any[], searchQuery: string) => products.filter(
	(p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()),
);

export const logicFilterProducts = async (cat: string, setProducts: any, setCurrentPage: any) => {
	try {
		let url = 'https://dummyjson.com/products?limit=100';
		if (cat !== 'Toate') {
			url = `https://dummyjson.com/products/category/${cat.toLowerCase()}?limit=100`;
		}

		const response = await fetch(url);
		if (!response.ok) throw new Error('Eroare la filtrare');

		const date = await response.json();
		// Aplicam si aici traducerea cheielor

		setProducts(date.products);
		setCurrentPage(1);
	} catch (error) {
		console.error('Eroare filtrare:', error);
	}
};
