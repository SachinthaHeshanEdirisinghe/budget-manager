import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFinance } from '../context/FinanceContext';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories';
import { colors, shadow } from '../theme';

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction } = useFinance();
  const insets = useSafeAreaInsets();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [note, setNote] = useState('');

  const cats = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const accent = type === 'expense' ? colors.expense : colors.income;

  const switchType = (t) => {
    setType(t);
    setCategory((t === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES)[0].id);
  };

  const save = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      Alert.alert('Invalid amount', 'Please enter an amount greater than 0.');
      return;
    }
    addTransaction({ type, amount: value, category, note: note.trim() });
    setAmount('');
    setNote('');
    navigation.navigate('Home');
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 40 }}
      keyboardShouldPersistTaps='handled'
    >
      <Text style={styles.title}>Add Transaction</Text>

      <View style={styles.toggle}>
        {['expense', 'income'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.toggleBtn, type === t && { backgroundColor: t === 'expense' ? colors.expense : colors.income }]}
            onPress={() => switchType(t)}
          >
            <Text style={[styles.toggleText, type === t && { color: '#fff' }]}>{t === 'expense' ? 'Expense' : 'Income'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Amount</Text>
      <View style={styles.amountBox}>
        <Text style={[styles.currency, { color: accent }]}>Rs</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          placeholder='0.00'
          placeholderTextColor={colors.muted}
          keyboardType='decimal-pad'
        />
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.grid}>
        {cats.map((c) => {
          const active = category === c.id;
          return (
            <TouchableOpacity
              key={c.id}
              style={[styles.chip, active && { backgroundColor: c.color, borderColor: c.color }]}
              onPress={() => setCategory(c.id)}
            >
              <Ionicons name={c.icon} size={18} color={active ? '#fff' : c.color} />
              <Text style={[styles.chipText, active && { color: '#fff' }]}>{c.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={styles.noteInput}
        value={note}
        onChangeText={setNote}
        placeholder='e.g. Lunch with friends'
        placeholderTextColor={colors.muted}
      />

      <TouchableOpacity style={[styles.save, { backgroundColor: accent }]} onPress={save}>
        <Ionicons name='checkmark-circle' size={22} color='#fff' />
        <Text style={styles.saveText}>Save Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 18 },
  toggle: { flexDirection: 'row', backgroundColor: '#E8EAF2', borderRadius: 16, padding: 4 },
  toggleBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  toggleText: { fontWeight: '700', color: colors.muted },
  label: { fontSize: 14, fontWeight: '700', color: colors.text, marginTop: 22, marginBottom: 8 },
  amountBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 16, paddingHorizontal: 16, ...shadow },
  currency: { fontSize: 22, fontWeight: '800', marginRight: 8 },
  amountInput: { flex: 1, fontSize: 28, fontWeight: '800', paddingVertical: 14, color: colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  chipText: { fontWeight: '600', color: colors.text },
  noteInput: { backgroundColor: colors.card, borderRadius: 16, padding: 16, fontSize: 15, color: colors.text, ...shadow },
  save: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, borderRadius: 18, marginTop: 30 },
  saveText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});