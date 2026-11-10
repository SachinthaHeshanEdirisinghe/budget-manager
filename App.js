import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FinanceProvider } from './src/context/FinanceContext';
import { colors, shadow } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import BudgetScreen from './src/screens/BudgetScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();
const icons = { Home: 'home', Transactions: 'list', Budget: 'wallet', Stats: 'pie-chart' };

export default function App() {
  return (
    <SafeAreaProvider>
      <FinanceProvider>
        <NavigationContainer>
          <StatusBar style='dark' />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.muted,
              tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 6, borderTopWidth: 0, ...shadow },
              tabBarIcon: ({ color, size, focused }) =>
                route.name === 'Add' ? (
                  <Ionicons name='add-circle' size={46} color={colors.primary} style={{ marginTop: -14 }} />
                ) : (
                  <Ionicons name={focused ? icons[route.name] : icons[route.name] + '-outline'} size={size} color={color} />
                ),
            })}
          >
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Transactions' component={TransactionsScreen} />
            <Tab.Screen name='Add' component={AddTransactionScreen} options={{ tabBarLabel: '' }} />
            <Tab.Screen name='Budget' component={BudgetScreen} />
            <Tab.Screen name='Stats' component={StatsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </FinanceProvider>
    </SafeAreaProvider>
  );
}