import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Category } from '@/types';
import { CategoryIcon } from './CategoryIcon';

interface CategoryPickerProps {
  categories: Category[];
  selectedId: string;
  onSelect: (categoryId: string) => void;
  onAddCustom?: (name: string, color: string) => void;
}

const CUSTOM_COLORS = [
  '#F97316', '#3B82F6', '#EC4899', '#EF4444',
  '#8B5CF6', '#14B8A6', '#10B981', '#F59E0B',
  '#6366F1', '#06B6D4',
];

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  selectedId,
  onSelect,
  onAddCustom,
}) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customColor, setCustomColor] = useState(CUSTOM_COLORS[0]);

  const handleAddCustom = () => {
    if (customName.trim() && onAddCustom) {
      onAddCustom(customName.trim(), customColor);
      setCustomName('');
      setShowCustom(false);
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {categories.map((cat) => {
          const isSelected = cat.id === selectedId;
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => onSelect(cat.id)}
              activeOpacity={0.7}
              className="mr-2.5 items-center rounded-2xl px-3 py-2.5"
              style={{
                backgroundColor: isSelected ? `${cat.color}15` : '#F5F5F5',
                borderWidth: isSelected ? 1.5 : 0,
                borderColor: isSelected ? cat.color : 'transparent',
                minWidth: 76,
              }}
            >
              <CategoryIcon iconName={cat.icon} color={cat.color} size={18} showBackground={false} />
              <Text
                className="mt-1.5 text-xs font-medium"
                style={{ color: isSelected ? cat.color : '#737373' }}
                numberOfLines={1}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Add Custom Button */}
        <TouchableOpacity
          onPress={() => setShowCustom(!showCustom)}
          activeOpacity={0.7}
          className="items-center justify-center rounded-2xl px-3 py-2.5"
          style={{
            backgroundColor: '#F5F5F5',
            borderWidth: 1,
            borderColor: '#E5E5E5',
            borderStyle: 'dashed',
            minWidth: 76,
          }}
        >
          <Plus size={18} color="#A3A3A3" strokeWidth={2} />
          <Text className="mt-1.5 text-xs font-medium" style={{ color: '#A3A3A3' }}>
            Custom
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Category Input */}
      {showCustom && (
        <View className="mt-3 rounded-2xl bg-surface-50 p-4">
          <TextInput
            value={customName}
            onChangeText={setCustomName}
            placeholder="Category name"
            placeholderTextColor="#A3A3A3"
            className="mb-3 rounded-xl bg-white px-4 py-3 text-sm"
            style={{ color: '#171717', borderWidth: 1, borderColor: '#E5E5E5' }}
          />

          {/* Color picker */}
          <View className="mb-3 flex-row flex-wrap">
            {CUSTOM_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setCustomColor(color)}
                className="mb-2 mr-2 rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: color,
                  borderWidth: customColor === color ? 3 : 0,
                  borderColor: '#FFFFFF',
                  shadowColor: color,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: customColor === color ? 0.4 : 0,
                  shadowRadius: 4,
                  elevation: customColor === color ? 4 : 0,
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={handleAddCustom}
            activeOpacity={0.8}
            className="items-center rounded-xl py-2.5"
            style={{ backgroundColor: '#4F46E5' }}
          >
            <Text className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
              Add Category
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
