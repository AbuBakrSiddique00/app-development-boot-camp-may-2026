import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, Category } from '@/types';
import { STORAGE_KEYS } from '@/constants';

/**
 * Load all transactions from local storage.
 */
export const loadTransactions = async (): Promise<Transaction[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!data) return [];
    return JSON.parse(data) as Transaction[];
  } catch (error) {
    console.error('Failed to load transactions:', error);
    return [];
  }
};

/**
 * Save all transactions to local storage.
 */
export const saveTransactions = async (transactions: Transaction[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Failed to save transactions:', error);
  }
};

/**
 * Load custom categories from local storage.
 */
export const loadCustomCategories = async (): Promise<Category[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CUSTOM_CATEGORIES);
    if (!data) return [];
    return JSON.parse(data) as Category[];
  } catch (error) {
    console.error('Failed to load custom categories:', error);
    return [];
  }
};

/**
 * Save custom categories to local storage.
 */
export const saveCustomCategories = async (categories: Category[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CUSTOM_CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to save custom categories:', error);
  }
};

/**
 * Clear all app data (for debugging/reset).
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TRANSACTIONS,
      STORAGE_KEYS.CUSTOM_CATEGORIES,
    ]);
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
};
