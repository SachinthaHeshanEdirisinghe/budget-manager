export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food', icon: 'fast-food', color: '#FF9F43' },
  { id: 'transport', label: 'Transport', icon: 'car', color: '#54A0FF' },
  { id: 'shopping', label: 'Shopping', icon: 'bag', color: '#F368E0' },
  { id: 'bills', label: 'Bills', icon: 'receipt', color: '#FF6B6B' },
  { id: 'health', label: 'Health', icon: 'medkit', color: '#1DD1A1' },
  { id: 'fun', label: 'Fun', icon: 'game-controller', color: '#5F27CD' },
  { id: 'other', label: 'Other', icon: 'ellipsis-horizontal', color: '#8395A7' },
];

export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: 'cash', color: '#00B894' },
  { id: 'freelance', label: 'Freelance', icon: 'laptop', color: '#0984E3' },
  { id: 'gift', label: 'Gift', icon: 'gift', color: '#FD79A8' },
  { id: 'otherIncome', label: 'Other', icon: 'add-circle', color: '#6C5CE7' },
];

export const getCategory = (id) =>
  [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find((c) => c.id === id) ||
  EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];