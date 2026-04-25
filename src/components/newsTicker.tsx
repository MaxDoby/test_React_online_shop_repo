export const NewsTicker = () => {
    const message = [
        '🔥 Reduceri de până la 50% la categoria Laptops!',
        '🚀 Transport gratuit la comenzi de peste 200 RON!',
        '💎 Noi produse adăugate zilnic în stoc!',
        '📱 Verifică noile accesorii pentru Smartwatch!',
    ];

    return (
        <div className="news-ticker-container">
            <div className="news-ticker">
                {/* Repetăm messagele pentru a crea un flux continuu */}
                <span>{message.join(' • ')} • </span>
                <span>{message.join(' • ')} • </span>
            </div>
        </div>
    );
};
