import { Link } from 'expo-router';
import { Text, View } from 'react-native';

interface ISettingsProps {}

export default function SettingsScreen() {
  return (
    <View>
      <Text>Settings page</Text>

      <Link href="/settings/app-settings">Link to App Settings</Link>
    </View>
  );
}
