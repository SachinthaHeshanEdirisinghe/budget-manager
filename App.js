import { Button, Text, View } from 'react-native';
import { FinanceProvider, useFinance } from './src/context/FinanceContext';
import { formatMoney } from './src/utils/format';

function Test() {
  const { transactions, totals, addTransaction } = useFinance();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Transactions: {transactions.length}</Text>
      <Text>Balance: {formatMoney(totals.balance)}</Text>
      <Button title='Add Rs 1000 income' onPress={() => addTransaction({ type: 'income', amount: 1000, category: 'salary', note: 'Test' })} />
    </View>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <Test />
    </FinanceProvider>
  );
}