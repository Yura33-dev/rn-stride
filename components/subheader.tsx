import { cn } from '@/utilities';
import { Text, View } from 'react-native';

interface ISubheaderProps {
  title: string;
  className?: string;
}

export default function Subheader({ title, className }: ISubheaderProps) {
  return (
    <View>
      <Text
        className={cn(
          'font-semibold text-sm uppercase text-secondary mb-4',
          className && className,
        )}
      >
        {title}
      </Text>
    </View>
  );
}
