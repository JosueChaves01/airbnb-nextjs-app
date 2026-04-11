import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover, className = '' }: CardProps) {
  return (
    <div 
      className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 ${
        hover ? 'hover:shadow-xl hover:-translate-y-1.5 hover:border-[#008481]/30 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
}

export function CardImage({ src, alt }: CardImageProps) {
  return (
    <div className="-m-6 mb-4 overflow-hidden rounded-t-3xl">
      <img src={src} alt={alt} className="w-full h-48 object-cover" />
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
}

export function CardTitle({ children }: CardTitleProps) {
  return (
    <h3 className="font-serif text-xl text-[#123a57] mb-2">{children}</h3>
  );
}

interface CardContentProps {
  children: ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return (
    <p className="text-gray-500 text-sm leading-relaxed">{children}</p>
  );
}
