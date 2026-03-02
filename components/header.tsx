import { cn } from '@/utilities';
import { useNavigation } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import BackButton from './ui/back-btn';

interface IHeaderProps {
  title: string;
  icon?: ReactNode;
  onIconPress?: () => void;
  withGoBack?: boolean;
}

export default function Header({
  title,
  onIconPress = undefined,
  icon = null,
  withGoBack = false,
}: IHeaderProps) {
  const navigate = useNavigation();

  return (
    <View className={cn('flex-row justify-between items-center', withGoBack && 'justify-start')}>
      {withGoBack && <BackButton onlyIcon />}

      <Text className="text-foreground font-bold text-4xl">{title}</Text>
      {icon && (
        <Pressable
          className="w-12 h-12 rounded-full bg-blue-800/20 justify-center items-center active:opacity-50"
          onPress={onIconPress}
        >
          {icon}
        </Pressable>
      )}
    </View>
  );
}
