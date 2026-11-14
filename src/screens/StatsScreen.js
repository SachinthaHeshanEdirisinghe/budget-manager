import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFinance } from '../context/FinanceContext';
import { getCategory } from '../constants/categories';
import { colors, shadow } from '../theme';
import { formatMoney } from '../utils/format';
import EmptyState from '../components/EmptyState';

function Bar({ label, value, max, color }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <View style={styles.rowBetween}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={styles.barValue}>{formatMoney(value)}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${(value / max) * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function StatsScreen() {
  const { transactions, totals } = useFinance();
  const insets = useSafeAreaInsets();

  const expenses = transactions.filter((t) => t.type === 'expense');
  const byCat = {};
  expenses.forEach((t) => {
    byCat[t.category] = (byCat[t.category] || 0) + t.amount;
  });
  const rows = Object.entries(byCat)
    .map(([id, amt]) => ({ cat: getCategory(id), amt }))
    .sort((a, b) => b.amt - a.amt);
  const maxCat = rows.length ? rows[0].amt : 1;
  const maxTotal = Math.max(totals.income, totals.expense, 1);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 40 }}
    >
      <Text style={styles.title}>Statistics</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Income vs Expenses</Text>
        <Bar label='Income' value={totals.income} max={maxTotal} color={colors.income} />
        <Bar label='Expenses' value={totals.expense} max={maxTotal} color={colors.expense} />
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Spending by Category</Text>
        {rows.length === 0 ? (
          <EmptyState title='No expenses yet' subtitle='Add some expenses to see your breakdown.' />
        ) : (
          rows.map(({ cat, amt }) => (
            <View key={cat.id}>
              <View style={styles.catRow}>
                <Ionicons name={cat.icon} size={16} color={cat.color} />
                <Text style={styles.catText}>{Math.round((amt / totals.expense) * 100)}% of spending</Text>
              </View>
              <Bar label={cat.label} value={amt} max={maxCat} color={cat.color} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 18 },
  card: { backgroundColor: colors.card, borderRadius: 22, padding: 20, marginBottom: 18, ...shadow },
  heading: { fontSize: 17, fontWeight: '800', color: colors.text, marginBottom: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { fontWeight: '700', color: colors.text },
  barValue: { color: colors.muted, fontWeight: '600' },
  track: { height: 12, backgroundColor: '#E8EAF2', borderRadius: 6, overflow: 'hidden' },
  fill: { height: 12, borderRadius: 6 },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  catText: { color: colors.muted, fontSize: 12 },
});