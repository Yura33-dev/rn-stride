import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-red-600">Tasks Screen</Text>

      <Link href="/(tasks)/daily-tasks" asChild push>
        <Button title="Link to daily tasks" />
      </Link>
    </View>
  );
}
