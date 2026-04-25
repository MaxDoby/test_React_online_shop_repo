import { Button } from "./button";

interface FilterNavProps {
    categories: string[];
    filterProducts: (cat:string) => void;
}

export const FilterNav = ({ categories, filterProducts }:FilterNavProps) => {
    return (
        <nav className="filter-nav">
            {categories.map((cat) => (
                <Button key={cat} className="btn-filter" onClick={() => filterProducts(cat)}
                >
                    {cat}
                </Button>
            ))}
        </nav>
    )
}
