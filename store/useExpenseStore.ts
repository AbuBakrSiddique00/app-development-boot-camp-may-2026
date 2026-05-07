import { create } from 'zustand';
import { Transaction, Category, DashboardSummary, TransactionType } from '@/types';
import { DEFAULT_CATEGORIES } from '@/constants';
import { generateId } from '@/utils';
import {
  loadTransactions,
  saveTransactions,
  loadCustomCategories,
  saveCustomCategories,
} from '@/services/storage';

interface ExpenseStore {
  // State
  transactions: Transaction[];
  customCategories: Category[];
  isLoading: boolean;
  isInitialized: boolean;

  // Computed
  getAllCategories: () => Category[];
  getDashboardSummary: () => DashboardSummary;
  getRecentTransactions: (limit?: number) => Transaction[];
  getExpenses: () => Transaction[];
  getCategoryById: (id: string) => Category | undefined;

  // Actions
  initialize: () => Promise<void>;
  addTransaction: (data: {
    type: TransactionType;
    title: string;
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addCustomCategory: (name: string, color: string) => Promise<Category>;
}

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  // Initial state
  transactions: [],
  customCategories: [],
  isLoading: false,
  isInitialized: false,

  // Get all categories (default + custom).
   
  getAllCategories: () => {
    return [...DEFAULT_CATEGORIES, ...get().customCategories];
  },

  // Compute dashboard summary from all transactions.
  
  getDashboardSummary: (): DashboardSummary => {
    const { transactions } = get();

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance: totalIncome - totalExpenses,
      totalExpenses,
      totalIncome,
    };
  },

  
  //  Get recent transactions sorted by date (newest first).
  
  getRecentTransactions: (limit = 5) => {
    return [...get().transactions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },


  //  Get only expense transactions.

  getExpenses: () => {
    return [...get().transactions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

    // Find a category by its ID.

  getCategoryById: (id: string) => {
    return get().getAllCategories().find((c) => c.id === id);
  },

  /**
   * Initialize store from persistent storage.
   * Called once when the app starts.
   */
  initialize: async () => {
    if (get().isInitialized) return;
    set({ isLoading: true });

    const [transactions, customCategories] = await Promise.all([
      loadTransactions(),
      loadCustomCategories(),
    ]);

    set({
      transactions,
      customCategories,
      isLoading: false,
      isInitialized: true,
    });
  },

  /**
   * Add a new transaction (expense or income).
   */
  addTransaction: async (data) => {
    const newTransaction: Transaction = {
      id: generateId(),
      type: data.type,
      title: data.title.trim(),
      amount: data.amount,
      category: data.category,
      description: data.description.trim(),
      date: data.date,
      createdAt: new Date().toISOString(),
    };

    const updated = [...get().transactions, newTransaction];
    set({ transactions: updated });
    await saveTransactions(updated);
  },

  /**
   * Delete a transaction by its ID.
   */
  deleteTransaction: async (id: string) => {
    const updated = get().transactions.filter((t) => t.id !== id);
    set({ transactions: updated });
    await saveTransactions(updated);
  },

  /**
   * Add a new custom category.
   */
  addCustomCategory: async (name: string, color: string) => {
    const newCategory: Category = {
      id: `custom-${generateId()}`,
      name: name.trim(),
      icon: 'Tag',
      color,
      isCustom: true,
    };

    const updated = [...get().customCategories, newCategory];
    set({ customCategories: updated });
    await saveCustomCategories(updated);

    return newCategory;
  },
}));
