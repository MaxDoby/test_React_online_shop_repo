interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className: string;
}

export const Button = ({children, onClick, disabled, className = 'btn-filter'}:ButtonProps) => {
    return (
    <button 
            className={className} 
            onClick={onClick} 
            disabled={disabled}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }} // Finisaj vizual
        >
            {children}
    </button> 
    )
}
