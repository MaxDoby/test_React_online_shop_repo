interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    setCurrentPage: (pagina: number) => void
}

const Header = ({ searchQuery, setSearchQuery, setCurrentPage }: HeaderProps) => (
	<header className="header">
		<a href="/" className="logo-link">
			<div className="logo">
				<span className="logo-icon">⚡</span>
				Tech
				<span>Flow</span>
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
);

export default Header;
