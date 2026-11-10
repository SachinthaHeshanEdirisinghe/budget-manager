import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function EmptyState({ title, subtitle }) {
  return (
    <View style={{ alignItems: 'center', padding: 30 }}>
      <Ionicons name='file-tray-outline' size={56} color={colors.muted} />
      <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 10 }}>{title}</Text>
      <Text style={{ color: colors.muted, marginTop: 4, textAlign: 'center' }}>{subtitle}</Text>
    </View>
  );
}