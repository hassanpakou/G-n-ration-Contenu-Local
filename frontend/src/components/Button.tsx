import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const variants = {
  primary: 'bg-primary-900 hover:bg-primary-700 text-white',
  secondary: 'bg-white text-primary-900 border border-primary-900 hover:bg-gray-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

export default function Button({ children, variant = 'primary', href, onClick, className = '', disabled, type = 'button' }: ButtonProps) {
  const classes = `inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium transition-colors ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return (
    <button onClick={onClick} className={classes} disabled={disabled} type={type}>
      {children}
    </button>
  );
}