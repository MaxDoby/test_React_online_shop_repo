interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    setCurrentPage: (pagina: number) => void
}

export const Header = ({ searchQuery, setSearchQuery, setCurrentPage }: HeaderProps) => {
    return (
        <header className="header">
            <a
                href="/"
                className="logo-link"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.reload();
                }}
            >
                <div className="logo">
                    <span className="logo-icon">⚡</span> Tech<span>Flow</span>
                </div>
            </a>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Caută în viitor..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </header>
    )
};
