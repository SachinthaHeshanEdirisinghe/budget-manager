import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFinance } from '../context/FinanceContext';
import TransactionItem from '../components/TransactionItem';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'income', label: 'Income' },
  { id: 'expense', label: 'Expenses' },
];

export default function TransactionsScreen() {
  const { transactions, deleteTransaction } = useFinance();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');

  const data = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  const confirmDelete = (item) =>
    Alert.alert('Delete transaction?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTransaction(item.id) },
    ]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + 16 }}>
      <Text style={styles.title}>Transactions</Text>
      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[styles.filter, filter === f.id && styles.filterActive]}
            onPress={() => setFilter(f.id)}
          >
            <Text style={[styles.filterText, filter === f.id && { color: '#fff' }]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={data}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        renderItem={({ item }) => <TransactionItem item={item} onDelete={confirmDelete} />}
        ListEmptyComponent={<EmptyState title='Nothing here' subtitle='Add a transaction to see it listed.' />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '800', color: colors.text, paddingHorizontal: 20 },
  filters: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginVertical: 16 },
  filter: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, backgroundColor: '#E8EAF2' },
  filterActive: { backgroundColor: colors.primary },
  filterText: { fontWeight: '700', color: colors.muted },
});