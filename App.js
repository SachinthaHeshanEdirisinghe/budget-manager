import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme';

export default function App() {
  return (
    <LinearGradient colors={[colors.primaryDark, colors.primary, '#a29bfe']} style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.logo}>
        <Ionicons name='wallet' size={56} color='#fff' />
      </View>
      <Text style={styles.title}>Budget Manager</Text>
      <Text style={styles.sub}>Track income. Control spending.</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 110, height: 110, borderRadius: 55, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 30, fontWeight: '800', color: '#fff' },
  sub: { fontSize: 16, color: 'rgba(255,255,255,0.85)', marginTop: 6 },
});