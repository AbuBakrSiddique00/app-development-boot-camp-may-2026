import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react-native';

import Toast from 'react-native-toast-message';
import { useExpenseStore } from '@/store/useExpenseStore';
import { CategoryPicker } from '@/components/CategoryPicker';
import { TransactionType } from '@/types';
import { validateAmount } from '@/utils';

export default function AddScreen() {
  const router = useRouter();
  const addTransaction = useExpenseStore((s) => s.addTransaction);
  const getAllCategories = useExpenseStore((s) => s.getAllCategories);
  const addCustomCategory = useExpenseStore((s) => s.addCustomCategory);
  const getDashboardSummary = useExpenseStore((s) => s.getDashboardSummary);

  const [type, setType] = useState<TransactionType>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');


  const categories = getAllCategories();

  const handleSubmit = async () => {
    // Validate title
    if (!title.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Missing Title',
        text2: 'Please enter a title for this transaction.',
        position: 'top',
        visibilityTime: 2500,
      });
      return;
    }

    // Validate amount
    const amountValidation = validateAmount(amount);
    if (!amountValidation.valid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: amountValidation.error,
        position: 'top',
        visibilityTime: 2500,
      });
      return;
    }

    // Validate category for expenses
    if (type === 'expense' && !category) {
      Toast.show({
        type: 'error',
        text1: 'Select Category',
        text2: 'Please choose a category for this expense.',
        position: 'top',
        visibilityTime: 2500,
      });
      return;
    }

    // Validate balance — block expense if it exceeds available funds
    if (type === 'expense') {
      const { totalBalance } = getDashboardSummary();
      if (parseFloat(amount) > totalBalance) {
        Toast.show({
          type: 'error',
          text1: 'Insufficient Balance',
          text2: `You only have ৳${totalBalance.toFixed(2)} available.`,
          position: 'top',
          visibilityTime: 3000,
        });
        return;
      }
    }

    await addTransaction({
      type,
      title: title.trim(),
      amount: parseFloat(amount),
      category: type === 'income' ? 'income' : category,
      description: '',
      date: new Date().toISOString(),
    });

    Toast.show({
      type: 'success',
      text1: type === 'expense' ? 'Expense Added' : 'Income Added',
      text2: `Successfully recorded ${title.trim()}.`,
      position: 'top',
      visibilityTime: 2000,
    });

    router.back();
  };

  const handleAddCustomCategory = async (name: string, color: string) => {
    const newCat = await addCustomCategory(name, color);
    setCategory(newCat.id);
    Toast.show({
      type: 'success',
      text1: 'Category Created',
      text2: `"${name}" has been added.`,
      position: 'top',
      visibilityTime: 1500,
    });
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pb-2 pt-3">
          <Text className="text-xl font-bold" style={{ color: '#171717' }}>
            Add Transaction
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="rounded-full p-2"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <X size={20} color="#737373" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Type Segmented Control */}
          <View
            className="mx-5 mt-3 flex-row rounded-2xl p-1"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <TouchableOpacity
              onPress={() => setType('expense')}
              activeOpacity={0.8}
              className="flex-1 flex-row items-center justify-center rounded-xl py-3"
              style={{
                backgroundColor: type === 'expense' ? '#FFFFFF' : 'transparent',
                shadowColor: type === 'expense' ? '#000' : 'transparent',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: type === 'expense' ? 0.08 : 0,
                shadowRadius: 4,
                elevation: type === 'expense' ? 2 : 0,
              }}
            >
              <ArrowUpCircle
                size={18}
                color={type === 'expense' ? '#EF4444' : '#A3A3A3'}
                strokeWidth={2}
              />
              <Text
                className="ml-1.5 text-sm font-semibold"
                style={{ color: type === 'expense' ? '#EF4444' : '#A3A3A3' }}
              >
                Expense
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setType('income')}
              activeOpacity={0.8}
              className="flex-1 flex-row items-center justify-center rounded-xl py-3"
              style={{
                backgroundColor: type === 'income' ? '#FFFFFF' : 'transparent',
                shadowColor: type === 'income' ? '#000' : 'transparent',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: type === 'income' ? 0.08 : 0,
                shadowRadius: 4,
                elevation: type === 'income' ? 2 : 0,
              }}
            >
              <ArrowDownCircle
                size={18}
                color={type === 'income' ? '#10B981' : '#A3A3A3'}
                strokeWidth={2}
              />
              <Text
                className="ml-1.5 text-sm font-semibold"
                style={{ color: type === 'income' ? '#10B981' : '#A3A3A3' }}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View
            className="mt-5 px-5"
          >
            {/* Title */}
            <View className="mb-4">
              <Text className="mb-1.5 text-sm font-medium" style={{ color: '#525252' }}>
                Title
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder={type === 'expense' ? 'e.g. Lunch at cafe' : 'e.g. Salary'}
                placeholderTextColor="#D4D4D4"
                className="rounded-2xl bg-white px-4 py-3.5 text-base"
                style={{
                  color: '#171717',
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                }}
              />
            </View>

            {/* Amount */}
            <View className="mb-4">
              <Text className="mb-1.5 text-sm font-medium" style={{ color: '#525252' }}>
                Amount (৳)
              </Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor="#D4D4D4"
                keyboardType="decimal-pad"
                className="rounded-2xl bg-white px-4 py-3.5 text-base"
                style={{
                  color: '#171717',
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                }}
              />
            </View>

            {/* Category (only for expenses) */}
            {type === 'expense' && (
              <View className="mb-4">
                <Text className="mb-2 text-sm font-medium" style={{ color: '#525252' }}>
                  Category
                </Text>
                <CategoryPicker
                  categories={categories}
                  selectedId={category}
                  onSelect={setCategory}
                  onAddCustom={handleAddCustomCategory}
                />
              </View>
            )}


            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.85}
              className="items-center rounded-2xl py-4"
              style={{
                backgroundColor: type === 'expense' ? '#EF4444' : '#10B981',
                shadowColor: type === 'expense' ? '#EF4444' : '#10B981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text className="text-base font-bold" style={{ color: '#FFFFFF' }}>
                {type === 'expense' ? 'Add Expense' : 'Add Income'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
