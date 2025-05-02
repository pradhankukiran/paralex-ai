import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  headerAction?: ReactNode;
  noPadding?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  footer,
  headerAction,
  noPadding = false,
  bordered = true,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        bg-white/80 backdrop-blur-sm rounded-xl shadow-sm 
        ${bordered ? 'border border-slate-200' : ''} 
        ${hoverable ? 'transition-all duration-300 hover:border-blue-200 hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {(title || headerAction) && (
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white rounded-t-xl">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-slate-50/50 rounded-b-xl border-t border-slate-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;