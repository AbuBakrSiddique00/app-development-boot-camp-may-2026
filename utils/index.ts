import { CURRENCY } from '@/constants';

/** Generate a unique ID using timestamp + random string */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/** Format a number as currency string */
export const formatCurrency = (amount: number): string => {
  const formatted = Math.abs(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${CURRENCY.symbol}${formatted}`;
};

/** Format an ISO date string to a readable format */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

/** Format date for display in detail views */
export const formatFullDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

/** Validate a numeric amount string */
export const validateAmount = (value: string): { valid: boolean; error?: string } => {
  if (!value.trim()) {
    return { valid: false, error: 'Amount is required' };
  }

  const num = parseFloat(value);

  if (isNaN(num)) {
    return { valid: false, error: 'Please enter a valid number' };
  }

  if (num <= 0) {
    return { valid: false, error: 'Amount must be greater than zero' };
  }

  if (num > 99999999) {
    return { valid: false, error: 'Amount is too large' };
  }

  return { valid: true };
};

/** Truncate text with ellipsis */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};
