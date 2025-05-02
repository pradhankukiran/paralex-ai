import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-slate-100/80 text-slate-800 ring-1 ring-slate-200/50',
    primary: 'bg-blue-100/80 text-blue-800 ring-1 ring-blue-200/50',
    success: 'bg-emerald-100/80 text-emerald-800 ring-1 ring-emerald-200/50',
    warning: 'bg-amber-100/80 text-amber-800 ring-1 ring-amber-200/50',
    danger: 'bg-red-100/80 text-red-800 ring-1 ring-red-200/50',
    info: 'bg-sky-100/80 text-sky-800 ring-1 ring-sky-200/50',
  };

  const sizeStyles = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;