import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  iconOnly?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1 rounded-lg px-3 text-sm [&_svg]:size-4',
  md: 'h-10 gap-1.5 rounded-lg px-3.5 text-sm [&_svg]:size-5',
  lg: 'h-11 gap-1.5 rounded-lg px-4 text-md [&_svg]:size-5',
};

const iconOnlySizeClass: Record<ButtonSize, string> = {
  sm: 'size-9 rounded-lg [&_svg]:size-4',
  md: 'size-10 rounded-lg [&_svg]:size-5',
  lg: 'size-11 rounded-lg [&_svg]:size-5',
};

const hierarchyClass: Record<ButtonHierarchy, string> = {
  primary:
    'bg-primary-700 text-white shadow-sm hover:bg-primary-800 focus-visible:ring-primary-700/40',
  secondary:
    'border border-dark-200 bg-white text-dark-800 shadow-sm hover:bg-dark-100 focus-visible:ring-primary-700/30',
  tertiary: 'text-dark-800 hover:bg-dark-100 focus-visible:ring-primary-700/30',
  link: 'text-primary-700 hover:text-primary-800 focus-visible:ring-primary-700/30',
};

export function Button({
  hierarchy = 'primary',
  size = 'md',
  iconOnly = false,
  iconLeading,
  iconTrailing,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const isLink = hierarchy === 'link';

  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center font-semibold whitespace-nowrap transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        isLink
          ? 'gap-1 rounded-md px-0.5 text-sm'
          : iconOnly
            ? iconOnlySizeClass[size]
            : sizeClass[size],
        hierarchyClass[hierarchy],
        className,
      )}
      {...props}
    >
      {iconLeading ? <span className="inline-flex shrink-0">{iconLeading}</span> : null}
      {children}
      {iconTrailing ? <span className="inline-flex shrink-0">{iconTrailing}</span> : null}
    </button>
  );
}
