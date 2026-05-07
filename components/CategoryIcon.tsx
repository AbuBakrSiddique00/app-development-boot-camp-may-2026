import React from 'react';
import { View } from 'react-native';
import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  GraduationCap,
  Gamepad2,
  HeartPulse,
  Tag,
  Plus,
  Minus,
  Wallet,
  type LucideProps,
} from 'lucide-react-native';

/** Map of icon name strings to Lucide components */
const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  GraduationCap,
  Gamepad2,
  HeartPulse,
  Tag,
  Plus,
  Minus,
  Wallet,
};

interface CategoryIconProps {
  iconName: string;
  color: string;
  size?: number;
  showBackground?: boolean;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconName,
  color,
  size = 20,
  showBackground = true,
}) => {
  const IconComponent = ICON_MAP[iconName] || Tag;

  if (!showBackground) {
    return <IconComponent size={size} color={color} strokeWidth={2} />;
  }

  return (
    <View
      style={{ backgroundColor: `${color}15` }}
      className="items-center justify-center rounded-xl p-2.5"
    >
      <IconComponent size={size} color={color} strokeWidth={2} />
    </View>
  );
};
