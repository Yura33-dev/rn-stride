import { cn } from '@/utilities';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IViewContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ViewContainer({ children, className }: IViewContainerProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top + 24,
        paddingLeft: insets.left + 12,
        paddingRight: insets.right + 12,
      }}
      className={cn(className && className)}
    >
      {children}
    </View>
  );
}
