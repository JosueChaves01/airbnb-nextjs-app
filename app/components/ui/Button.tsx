import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick,
  disabled,
  fullWidth
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#008481] to-[#006a66] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'border-2 border-gray-200 text-[#123a57] hover:border-[#008481]/50 hover:text-[#006a66]',
    ghost: 'text-[#008481] hover:bg-[#008481]/10'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
