import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, X, Filter } from 'lucide-react-native';

import Toast from 'react-native-toast-message';
import { useExpenseStore } from '@/store/useExpenseStore';
import { TransactionCard } from '@/components/TransactionCard';
import { EmptyState } from '@/components/EmptyState';
import { DEFAULT_CATEGORIES } from '@/constants';

type FilterType = 'all' | 'expense' | 'income';

export default function DetailsScreen() {
  const router = useRouter();
  const transactions = useExpenseStore((s) => s.transactions);
  const deleteTransaction = useExpenseStore((s) => s.deleteTransaction);
  const customCategories = useExpenseStore((s) => s.customCategories);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sorted by newest first — recomputes whenever transactions change
  const allTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [transactions]
  );
  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    let results = allTransactions;

    // Type filter
    if (filterType !== 'all') {
      results = results.filter((t) => t.type === filterType);
    }

    // Category filter
    if (selectedCategory) {
      results = results.filter((t) => t.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return results;
  }, [allTransactions, searchQuery, selectedCategory, filterType]);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteTransaction(id);
            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Transaction removed successfully.',
              position: 'top',
              visibilityTime: 1500,
            });
          },
        },
      ]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setFilterType('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory || filterType !== 'all';

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pb-2 pt-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="mr-3 rounded-full p-2"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <ArrowLeft size={20} color="#525252" strokeWidth={2} />
          </TouchableOpacity>
          <Text className="text-xl font-bold" style={{ color: '#171717' }}>
            All Transactions
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          activeOpacity={0.7}
          className="rounded-full p-2"
          style={{ backgroundColor: showFilters ? '#EEF2FF' : '#F5F5F5' }}
        >
          <Filter
            size={20}
            color={showFilters ? '#6366F1' : '#737373'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        className="mx-5 mt-2 flex-row items-center rounded-2xl bg-white px-4"
        style={{
          borderWidth: 1,
          borderColor: '#E5E5E5',
        }}
      >
        <Search size={18} color="#A3A3A3" strokeWidth={2} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search transactions..."
          placeholderTextColor="#D4D4D4"
          className="ml-2 flex-1 py-3 text-sm"
          style={{ color: '#171717' }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
            <X size={16} color="#A3A3A3" strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Section */}
      {showFilters && (
        <View className="mt-3 px-5">
          {/* Type Filter */}
          <View className="mb-3 flex-row" style={{ gap: 8 }}>
            {([['all', 'All'], ['expense', 'Expenses'], ['income', 'Income']] as const).map(
              ([value, label]) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => setFilterType(value)}
                  activeOpacity={0.7}
                  className="rounded-xl px-4 py-2"
                  style={{
                    backgroundColor: filterType === value ? '#4F46E5' : '#F5F5F5',
                  }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: filterType === value ? '#FFFFFF' : '#737373' }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 4 }}
          >
            {allCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(
                  selectedCategory === cat.id ? null : cat.id
                )}
                activeOpacity={0.7}
                className="mr-2 rounded-xl px-3 py-1.5"
                style={{
                  backgroundColor:
                    selectedCategory === cat.id ? `${cat.color}20` : '#F5F5F5',
                  borderWidth: selectedCategory === cat.id ? 1 : 0,
                  borderColor: cat.color,
                }}
              >
                <Text
                  className="text-xs font-medium"
                  style={{
                    color: selectedCategory === cat.id ? cat.color : '#737373',
                  }}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <TouchableOpacity
              onPress={clearFilters}
              activeOpacity={0.7}
              className="mt-2 self-start"
            >
              <Text className="text-xs font-medium" style={{ color: '#EF4444' }}>
                Clear all filters
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Results Count */}
      <View className="mx-5 mt-3 mb-1">
        <Text className="text-xs font-medium" style={{ color: '#A3A3A3' }}>
          {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Transaction List */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {filteredTransactions.length === 0 ? (
          <EmptyState
            title="No results found"
            message={
              hasActiveFilters
                ? 'Try adjusting your filters or search query.'
                : 'Add your first transaction to get started.'
            }
          />
        ) : (
          filteredTransactions.map((transaction, index) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              index={index}
              showDelete
              onDelete={handleDelete}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
