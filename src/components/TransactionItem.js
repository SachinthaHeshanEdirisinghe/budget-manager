import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow } from '../theme';
import { getCategory } from '../constants/categories';
import { formatMoney, formatDate } from '../utils/format';

export default function TransactionItem({ item, onDelete }) {
  const cat = getCategory(item.category);
  const isIncome = item.type === 'income';
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: cat.color + '22' }]}>
        <Ionicons name={cat.icon} size={22} color={cat.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>{item.note || cat.label}</Text>
        <Text style={styles.date}>{cat.label} • {formatDate(item.date)}</Text>
      </View>
      <Text style={[styles.amount, { color: isIncome ? colors.income : colors.expense }]}>
        {isIncome ? '+' : '-'}{formatMoney(item.amount)}
      </Text>
      {onDelete && (
        <TouchableOpacity onPress={() => onDelete(item)} style={{ marginLeft: 10 }}>
          <Ionicons name='trash-outline' size={20} color={colors.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: 14, borderRadius: 16, marginBottom: 10, ...shadow },
  icon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  title: { fontSize: 15, fontWeight: '700', color: colors.text },
  date: { fontSize: 12, color: colors.muted, marginTop: 3 },
  amount: { fontSize: 15, fontWeight: '800' },
});