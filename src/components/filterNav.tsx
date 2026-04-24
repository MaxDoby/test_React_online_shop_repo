import { Button } from "./button";

interface FilterNavProps {
    categorii: string[];
    filtreazaProduse: (cat:string) => void;
}

export const FilterNav = ({ categorii, filtreazaProduse }:FilterNavProps) => {
    return (
        <nav className="filter-nav">
            {categorii.map((cat) => (
                <Button key={cat} className="btn-filter" onClick={() => filtreazaProduse(cat)}
                >
                    {cat}
                </Button>
            ))}
        </nav>
    )
}
