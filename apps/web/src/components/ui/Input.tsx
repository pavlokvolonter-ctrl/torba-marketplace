import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type InputSize = 'sm' | 'md';
type InputVariant = 'field' | 'search';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  hint?: string;
  error?: string;
  iconLeading?: ReactNode;
  trailing?: ReactNode;
  size?: InputSize;
  variant?: InputVariant;
};

const sizeClass: Record<InputSize, string> = {
  sm: 'h-10 text-sm',
  md: 'h-11 text-sm',
};

const iconClass: Record<InputSize, string> = {
  sm: 'left-3 [&_svg]:size-4',
  md: 'left-3.5 [&_svg]:size-5',
};

const iconPaddingClass: Record<InputSize, string> = {
  sm: 'pr-3 pl-9',
  md: 'pr-4 pl-11',
};

export function Input({
  label,
  hint,
  error,
  iconLeading,
  trailing,
  size = 'md',
  variant = 'field',
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const message = error ?? hint;
  const messageId = message ? `${inputId}-message` : undefined;

  return (
    <div className={cn('flex w-full min-w-0 flex-col', className)}>
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 text-sm font-medium text-dark-800">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {iconLeading ? (
          <span
            className={cn(
              'pointer-events-none absolute top-1/2 inline-flex -translate-y-1/2 text-dark-500',
              iconClass[size],
            )}
          >
            {iconLeading}
          </span>
        ) : null}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          className={cn(
            'w-full text-dark-800 outline-none placeholder:text-dark-500 disabled:cursor-not-allowed disabled:opacity-50',
            sizeClass[size],
            iconLeading ? iconPaddingClass[size] : 'px-3.5',
            trailing && 'pr-16',
            variant === 'search'
              ? 'rounded-full border-0 bg-dark-100 focus:ring-2 focus:ring-primary-700/30'
              : 'rounded-lg border bg-white shadow-sm focus:ring-2 focus:ring-primary-700/30',
            variant === 'field' &&
              (error ? 'border-red-500' : 'border-dark-200 focus:border-primary-700'),
          )}
          {...props}
        />
        {trailing ? (
          <span className="absolute top-1/2 right-4 inline-flex -translate-y-1/2">{trailing}</span>
        ) : null}
      </div>
      {message ? (
        <p id={messageId} className={cn('mt-1.5 text-sm', error ? 'text-red-600' : 'text-dark-500')}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
