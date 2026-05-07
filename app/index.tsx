import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight, ListFilter } from 'lucide-react-native';

import { useExpenseStore } from '@/store/useExpenseStore';
import { DashboardSummaryCard } from '@/components/DashboardSummaryCard';
import { TransactionCard } from '@/components/TransactionCard';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { EmptyState } from '@/components/EmptyState';

export default function HomeScreen() {
  const router = useRouter();
  const transactions = useExpenseStore((s) => s.transactions);

  // Recomputes reactively whenever transactions change
  const summary = useMemo(() => {
    const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { totalBalance: totalIncome - totalExpenses, totalIncome, totalExpenses };
  }, [transactions]);

  const recentTransactions = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6),
    [transactions]
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      <ScrollView
        className="flex-1"
        // showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View
          className="px-5 pb-2 pt-4"
        >
          <Text className="mt-0.5 text-2xl font-bold" style={{ color: '#171717' }}>
            MExpence
          </Text>
        </View>

        {/* Dashboard Summary Card */}
        <DashboardSummaryCard summary={summary} />

        {/* Recent Transactions Header */}
        <View
          className="mt-7 flex-row items-center justify-between px-5"
        >
          <Text className="text-lg font-bold" style={{ color: '#171717' }}>
            Recent Transactions
          </Text>
          {transactions.length > 0 && (
            <TouchableOpacity
              onPress={() => router.push('/details')}
              activeOpacity={0.7}
              className="flex-row items-center"
            >
              <Text className="mr-0.5 text-sm font-medium" style={{ color: '#6366F1' }}>
                See All
              </Text>
              <ChevronRight size={16} color="#6366F1" strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>

        {/* Transaction List or Empty State */}
        <View className="mt-3">
          {recentTransactions.length === 0 ? (
            <EmptyState />
          ) : (
            recentTransactions.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                index={index}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton onPress={() => router.push('/add')} />
    </SafeAreaView>
  );
}
