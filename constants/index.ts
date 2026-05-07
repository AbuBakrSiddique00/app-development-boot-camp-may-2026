import { Category } from '@/types';

/** Default expense categories with icons and brand colors */
export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'Food',
    icon: 'UtensilsCrossed',
    color: '#F97316', // orange
    isCustom: false,
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'Car',
    color: '#3B82F6', // blue
    isCustom: false,
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'ShoppingBag',
    color: '#EC4899', // pink
    isCustom: false,
  },
  {
    id: 'bills',
    name: 'Bills',
    icon: 'Receipt',
    color: '#EF4444', // red
    isCustom: false,
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    color: '#8B5CF6', // violet
    isCustom: false,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'Gamepad2',
    color: '#14B8A6', // teal
    isCustom: false,
  },
  {
    id: 'health',
    name: 'Health',
    icon: 'HeartPulse',
    color: '#10B981', // emerald
    isCustom: false,
  },
];

/** Storage keys for AsyncStorage */
export const STORAGE_KEYS = {
  TRANSACTIONS: '@mexpence/transactions',
  CUSTOM_CATEGORIES: '@mexpence/custom_categories',
} as const;

/** Currency configuration */
export const CURRENCY = {
  symbol: '৳',
  code: 'BDT',
  locale: 'en-BD',
} as const;

/** Animation durations in milliseconds */
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;
