import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFinance } from '../context/FinanceContext';
import { colors, shadow } from '../theme';
import { formatMoney } from '../utils/format';
import TransactionItem from '../components/TransactionItem';
import EmptyState from '../components/EmptyState';

function Pill({ icon, label, value, color }) {
  return (
    <View style={styles.pill}>
      <View style={[styles.pillIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={16} color='#fff' />
      </View>
      <View>
        <Text style={styles.pillLabel}>{label}</Text>
        <Text style={styles.pillValue}>{formatMoney(value)}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { transactions, totals, resetAll, loadDemoData } = useFinance();
  const insets = useSafeAreaInsets();
  const recent = transactions.slice(0, 5);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 30, paddingHorizontal: 20 }}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Welcome back 👋</Text>
          <Text style={styles.name}>My Wallet</Text>
        </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity style={styles.iconBtn} onPress={loadDemoData}>
            <Ionicons name='sparkles-outline' size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() =>
              Alert.alert('Reset all data?', 'All transactions will be deleted.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Reset', style: 'destructive', onPress: resetAll },
              ])
            }
          >
            <Ionicons name='trash-outline' size={20} color={colors.expense} />
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient colors={[colors.primary, '#a29bfe']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <Text style={styles.cardLabel}>Total Balance</Text>
        <Text style={styles.balance}>{formatMoney(totals.balance)}</Text>
        <View style={styles.pills}>
          <Pill icon='arrow-down' label='Income' value={totals.income} color={colors.income} />
          <Pill icon='arrow-up' label='Expenses' value={totals.expense} color={colors.expense} />
        </View>
      </LinearGradient>

      <View style={styles.sectionRow}>
        <Text style={styles.section}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.link}>See all</Text>
        </TouchableOpacity>
      </View>

      {recent.length === 0 ? (
        <EmptyState title='No transactions yet' subtitle='Tap the + button to add your first one.' />
      ) : (
        recent.map((t) => <TransactionItem key={t.id} item={t} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...shadow },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  hello: { color: colors.muted, fontSize: 14 },
  name: { color: colors.text, fontSize: 24, fontWeight: '800' },
  card: { borderRadius: 24, padding: 22, ...shadow },
  cardLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  balance: { color: '#fff', fontSize: 34, fontWeight: '800', marginVertical: 8 },
  pills: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.18)', padding: 10, borderRadius: 14, width: '48%' },
  pillIcon: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  pillLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 11 },
  pillValue: { color: '#fff', fontWeight: '700', fontSize: 12 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 26, marginBottom: 12 },
  section: { fontSize: 18, fontWeight: '800', color: colors.text },
  link: { color: colors.primary, fontWeight: '700' },
});