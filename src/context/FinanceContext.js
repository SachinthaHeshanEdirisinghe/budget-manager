import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@budget_manager_v1';
const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(50000);
  const [loaded, setLoaded] = useState(false);

  // load saved data once
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) {
          const data = JSON.parse(raw);
          setTransactions(data.transactions || []);
          setBudget(data.budget ?? 50000);
        }
      } catch (e) {
        console.warn('Load failed', e);
      }
      setLoaded(true);
    })();
  }, []);

  // save whenever data changes
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(KEY, JSON.stringify({ transactions, budget })).catch(() => {});
    }
  }, [transactions, budget, loaded]);

  const addTransaction = (t) =>
    setTransactions((prev) => [{ id: Date.now().toString(), date: new Date().toISOString(), ...t }, ...prev]);

  const deleteTransaction = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));

    const resetAll = () => {
    setTransactions([]);
    setBudget(50000);
  };

  const loadDemoData = () => {
    const ago = (days) => new Date(Date.now() - days * 86400000).toISOString();
    setTransactions([
      { id: 'd1', type: 'income', amount: 120000, category: 'salary', note: 'Monthly salary', date: ago(6) },
      { id: 'd2', type: 'expense', amount: 4500, category: 'food', note: 'Groceries', date: ago(5) },
      { id: 'd3', type: 'expense', amount: 2500, category: 'transport', note: 'Bus and fuel', date: ago(4) },
      { id: 'd4', type: 'expense', amount: 8200, category: 'bills', note: 'Electricity bill', date: ago(3) },
      { id: 'd5', type: 'income', amount: 15000, category: 'freelance', note: 'Website project', date: ago(2) },
      { id: 'd6', type: 'expense', amount: 6800, category: 'shopping', note: 'New shoes', date: ago(1) },
      { id: 'd7', type: 'expense', amount: 1800, category: 'fun', note: 'Movie night', date: ago(0) },
    ]);
  };

  const totals = useMemo(() => {
    const now = new Date();
    let income = 0;
    let expense = 0;
    let monthExpense = 0;
    transactions.forEach((t) => {
      if (t.type === 'income') income += t.amount;
      else {
        expense += t.amount;
        const d = new Date(t.date);
        if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) monthExpense += t.amount;
      }
    });
    return { income, expense, balance: income - expense, monthExpense };
  }, [transactions]);

    const value = { transactions, budget, setBudget, addTransaction, deleteTransaction, totals, loaded, resetAll, loadDemoData };
  
  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export const useFinance = () => useContext(FinanceContext);