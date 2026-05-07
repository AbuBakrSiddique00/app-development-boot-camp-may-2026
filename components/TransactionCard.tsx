import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Trash2 } from 'lucide-react-native';
import { Transaction } from '@/types';
import { useExpenseStore } from '@/store/useExpenseStore';
import { formatCurrency, formatDate } from '@/utils';
import { CategoryIcon } from './CategoryIcon';

interface TransactionCardProps {
  transaction: Transaction;
  index?: number;
  showDelete?: boolean;
  onPress?: () => void;
  onDelete?: (id: string) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  index = 0,
  showDelete = false,
  onPress,
  onDelete,
}) => {
  const getCategoryById = useExpenseStore((s) => s.getCategoryById);
  const category = getCategoryById(transaction.category);

  const isExpense = transaction.type === 'expense';

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="mx-4 mb-2.5 flex-row items-center rounded-2xl bg-white p-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        {/* Category Icon */}
        <CategoryIcon
          iconName={category?.icon || 'Tag'}
          color={category?.color || '#6366F1'}
          size={22}
        />

        {/* Title & Category */}
        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold" style={{ color: '#171717' }} numberOfLines={1}>
            {transaction.title}
          </Text>
          <Text className="mt-0.5 text-xs" style={{ color: '#A3A3A3' }}>
            {category?.name || 'Uncategorized'} · {formatDate(transaction.date)}
          </Text>
        </View>

        {/* Amount */}
        <View className="items-end">
          <Text
            className="text-base font-bold"
            style={{ color: isExpense ? '#EF4444' : '#10B981' }}
          >
            {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
          </Text>
        </View>

        {/* Delete Button */}
        {showDelete && onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(transaction.id)}
            className="ml-3 rounded-xl p-2"
            style={{ backgroundColor: '#FEF2F2' }}
            activeOpacity={0.6}
          >
            <Trash2 size={16} color="#EF4444" strokeWidth={2} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};
