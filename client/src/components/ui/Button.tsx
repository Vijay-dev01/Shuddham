import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-[#1E6F5C] text-white hover:bg-[#155d4c] focus:ring-[#1E6F5C]',
        secondary: 'bg-[#7A4A2E] text-white hover:bg-[#633b23] focus:ring-[#7A4A2E]',
        outline: 'border-2 border-[#1E6F5C] text-[#1E6F5C] hover:bg-[#1E6F5C]/10',
        ghost: 'hover:bg-gray-100 text-gray-700',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    };

    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
