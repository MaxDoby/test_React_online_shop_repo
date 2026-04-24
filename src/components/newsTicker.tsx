export const NewsTicker = () => {
    const mesaje = [
        '🔥 Reduceri de până la 50% la categoria Laptops!',
        '🚀 Transport gratuit la comenzi de peste 200 RON!',
        '💎 Noi produse adăugate zilnic în stoc!',
        '📱 Verifică noile accesorii pentru Smartwatch!',
    ];

    return (
        <div className="news-ticker-container">
            <div className="news-ticker">
                {/* Repetăm mesajele pentru a crea un flux continuu */}
                <span>{mesaje.join(' • ')} • </span>
                <span>{mesaje.join(' • ')} • </span>
            </div>
        </div>
    );
};
