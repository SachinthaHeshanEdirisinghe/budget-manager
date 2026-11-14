import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFinance } from '../context/FinanceContext';
import { colors, shadow } from '../theme';
import { formatMoney } from '../utils/format';

export default function BudgetScreen() {
  const { budget, setBudget, totals } = useFinance();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState(String(budget));

  const spent = totals.monthExpense;
  const pct = budget > 0 ? Math.min(spent / budget, 1) : 0;
  const remaining = budget - spent;
  const barColor = pct < 0.7 ? colors.income : pct < 1 ? '#FF9F43' : colors.expense;
  const message =
    pct < 0.7 ? 'You are doing great. Keep it up!' : pct < 1 ? 'Careful, you are close to your limit.' : 'Budget exceeded this month!';

  const save = () => {
    const v = parseFloat(input);
    if (!v || v <= 0) {
      Alert.alert('Invalid budget', 'Enter a number greater than 0.');
      return;
    }
    setBudget(v);
    Alert.alert('Saved', 'Monthly budget updated.');
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 40 }}
      keyboardShouldPersistTaps='handled'
    >
      <Text style={styles.title}>Monthly Budget</Text>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.small}>Spent this month</Text>
          <Text style={[styles.pct, { color: barColor }]}>{Math.round(pct * 100)}%</Text>
        </View>
        <Text style={styles.big}>{formatMoney(spent)}</Text>
        <Text style={styles.small}>of {formatMoney(budget)}</Text>

        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: barColor }]} />
        </View>

        <View style={[styles.msg, { backgroundColor: barColor + '22' }]}>
          <Ionicons name={pct < 1 ? 'happy-outline' : 'warning-outline'} size={20} color={barColor} />
          <Text style={[styles.msgText, { color: barColor }]}>{message}</Text>
        </View>

        <Text style={styles.remaining}>
          {remaining >= 0 ? 'Remaining: ' + formatMoney(remaining) : 'Over budget by: ' + formatMoney(-remaining)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Set monthly budget</Text>
        <TextInput style={styles.input} value={input} onChangeText={setInput} keyboardType='decimal-pad' />
        <TouchableOpacity style={styles.btn} onPress={save}>
          <Text style={styles.btnText}>Save Budget</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 18 },
  card: { backgroundColor: colors.card, borderRadius: 22, padding: 20, marginBottom: 18, ...shadow },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  small: { color: colors.muted, fontSize: 13 },
  pct: { fontWeight: '800', fontSize: 16 },
  big: { fontSize: 30, fontWeight: '800', color: colors.text, marginVertical: 4 },
  track: { height: 14, backgroundColor: '#E8EAF2', borderRadius: 7, marginVertical: 16, overflow: 'hidden' },
  fill: { height: 14, borderRadius: 7 },
  msg: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12 },
  msgText: { fontWeight: '700', flex: 1 },
  remaining: { marginTop: 14, fontWeight: '700', color: colors.text },
  label: { fontWeight: '700', color: colors.text, marginBottom: 10 },
  input: { backgroundColor: colors.bg, borderRadius: 14, padding: 14, fontSize: 18, fontWeight: '700', color: colors.text },
  btn: { backgroundColor: colors.primary, padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 14 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});