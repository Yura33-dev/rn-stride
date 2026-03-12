import { cn } from '@/utilities';
import { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IScrollViewContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollViewContainer({ children, className }: IScrollViewContainerProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: insets.top + 24,
        paddingLeft: insets.left + 12,
        paddingRight: insets.right + 12,
      }}
      className={cn(className && className)}
    >
      {children}
    </ScrollView>
  );
}
