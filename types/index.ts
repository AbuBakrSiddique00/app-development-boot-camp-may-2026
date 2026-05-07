export type EntityId = string;
export type TransactionType = 'expense' | 'income';

export type DefaultCategoryId =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'education'
  | 'entertainment'
  | 'health';

/** Category definition with icon and color */
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isCustom: boolean;
}

/** A single expense/income transaction */
export interface Transaction {
  id: EntityId;
  type: TransactionType;
  title: string;
  amount: number;
  category: string; // Category ID
  description: string;
  date: string; // ISO date string
  createdAt: string; // ISO timestamp
}

/** Summary statistics for the dashboard */
export interface DashboardSummary {
  totalBalance: number;
  totalExpenses: number;
  totalIncome: number;
}

/** Filter options for expense list */
export interface ExpenseFilters {
  searchQuery: string;
  categoryId: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}
