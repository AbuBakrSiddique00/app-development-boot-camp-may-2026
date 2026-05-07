import React from 'react';
import { View, Text } from 'react-native';
import { Receipt } from 'lucide-react-native';


interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No transactions yet',
  message = 'Tap the + button to add your first expense or income.',
  icon,
}) => {
  return (
    <View
      className="flex-1 items-center justify-center px-8 py-16"
    >
      {/* Illustration Circle */}
      <View
        className="mb-6 items-center justify-center rounded-full"
        style={{
          width: 96,
          height: 96,
          backgroundColor: '#EEF2FF',
        }}
      >
        {icon || <Receipt size={40} color="#A5B4FC" strokeWidth={1.5} />}
      </View>

      <Text className="mb-2 text-center text-lg font-semibold" style={{ color: '#404040' }}>
        {title}
      </Text>
      <Text className="text-center text-sm leading-5" style={{ color: '#A3A3A3' }}>
        {message}
      </Text>
    </View>
  );
};
