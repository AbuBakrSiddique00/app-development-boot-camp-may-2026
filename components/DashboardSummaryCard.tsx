import React from 'react';
import { View, Text } from 'react-native';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react-native';

import { DashboardSummary } from '@/types';
import { formatCurrency } from '@/utils';

interface DashboardSummaryCardProps {
  summary: DashboardSummary;
}

export const DashboardSummaryCard: React.FC<DashboardSummaryCardProps> = ({ summary }) => {
  return (
    <View>
      <View
        className="mx-4 mt-2 rounded-3xl p-6"
        style={{
          backgroundColor: '#328fa0ff',
          shadowColor: '#4F46E5',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
          elevation: 12,
        }}
      >
        {/* Balance Label */}
        <View className="mb-1 flex-row items-center">
          <Wallet size={16} color="rgba(255,255,255,0.7)" strokeWidth={2} />
          <Text className="ml-1.5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Total Balance
          </Text>
        </View>

        {/* Balance Amount */}
        <Text className="mb-5 text-4xl font-bold" style={{ color: '#FFFFFF' }}>
          {formatCurrency(summary.totalBalance)}
        </Text>

        {/* Income / Expense Row */}
        <View className="flex-row justify-between">
          {/* Income */}
          <View className="flex-1 flex-row items-center">
            <View
              className="mr-2.5 items-center justify-center rounded-xl p-2"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <TrendingUp size={18} color="#34D399" strokeWidth={2.5} />
            </View>
            <View>
              <Text className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Income
              </Text>
              <Text className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                {formatCurrency(summary.totalIncome)}
              </Text>
            </View>
          </View>

          {/* Expense */}
          <View className="flex-1 flex-row items-center justify-end">
            <View
              className="mr-2.5 items-center justify-center rounded-xl p-2"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <TrendingDown size={18} color="#F87171" strokeWidth={2.5} />
            </View>
            <View>
              <Text className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Expenses
              </Text>
              <Text className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                {formatCurrency(summary.totalExpenses)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
