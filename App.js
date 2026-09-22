import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

import { FinanceProvider } from './FinanceContext';
import { ThemeProvider, ThemeContext } from './ThemeContext';

import Dashboard from './components/Dashboard';
import Transacoes from './components/Transacoes';
import Adicionar from './components/Adicionar';
import Metas from './components/Metas';
import Configuracoes from './components/Configuracoes';

const Drawer = createDrawerNavigator();

function MainNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar barStyle={theme.isDark ? "light-content" : "dark-content"} backgroundColor={theme.background} />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Dashboard"
          screenOptions={({ route }) => ({
            headerStyle: { 
              backgroundColor: theme.background,
              elevation: 0, shadowOpacity: 0,
            },
            headerTintColor: theme.text,
            headerTitleAlign: 'center',
            drawerStyle: { backgroundColor: theme.background },
            drawerActiveTintColor: theme.primary,
            drawerActiveBackgroundColor: theme.primaryLight,
            drawerInactiveTintColor: theme.textSecondary,
            drawerLabelStyle: { fontSize: 16, fontWeight: '600' },
            drawerIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Dashboard') iconName = focused ? 'pie-chart' : 'pie-chart-outline';
              else if (route.name === 'Transações') iconName = focused ? 'list' : 'list-outline';
              else if (route.name === 'Adicionar') iconName = focused ? 'add-circle' : 'add-circle-outline';
              else if (route.name === 'Metas') iconName = focused ? 'flag' : 'flag-outline';
              else if (route.name === 'Configurações') iconName = focused ? 'settings' : 'settings-outline';
              return <Ionicons name={iconName} size={size + 2} color={color} />;
            },
          })}
        >
          <Drawer.Screen name="Dashboard" component={Dashboard} options={{ title: 'Meu Painel' }} />
          <Drawer.Screen name="Transações" component={Transacoes} options={{ title: 'Histórico' }} />
          <Drawer.Screen name="Adicionar" component={Adicionar} options={{ title: 'Nova Transação' }} />
          <Drawer.Screen name="Metas" component={Metas} options={{ title: 'Minhas Metas' }} />
          <Drawer.Screen name="Configurações" component={Configuracoes} options={{ title: 'Configurações' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <MainNavigator />
      </FinanceProvider>
    </ThemeProvider>
  );
}