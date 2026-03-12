import { ActivityIndicator, Text, View } from 'react-native';

interface ICustomToastProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  loading?: boolean;
}

export default function CustomToast({
  title,
  icon = undefined,
  description = undefined,
  loading = false,
}: ICustomToastProps) {
  return (
    <View className="w-[340] self-center flex-row items-center gap-3 bg-white px-4 py-3 rounded-xl">
      {loading ? <ActivityIndicator color="#374151" /> : icon && icon}
      <View>
        <Text className="text-gray-700 font-semibold">{title}</Text>
        {description && <Text className="text-gray-500 text-sm">{description}</Text>}
      </View>
    </View>
  );
}
