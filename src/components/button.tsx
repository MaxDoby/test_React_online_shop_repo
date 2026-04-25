import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({
	children, onClick, disabled, className = 'btn-filter', type = 'button',
}: ButtonProps) => (
	<button
        // eslint-disable-next-line react/button-has-type
		type={type}
		className={className}
		onClick={onClick}
		disabled={disabled}
		style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
		{children}
	</button>
);

export default Button;
