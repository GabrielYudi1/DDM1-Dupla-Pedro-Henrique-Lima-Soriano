import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FinanceContext } from '../FinanceContext';
import { ThemeContext } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard({ navigation }) {
  const { transactions } = useContext(FinanceContext);
  const { theme } = useContext(ThemeContext);

  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  const formatMoney = (value) => {
    let [intPart, decimalPart] = value.toFixed(2).split('.');
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${intPart},${decimalPart}`;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.text }]}>Olá!</Text>
        <Text style={[styles.subGreeting, { color: theme.textSecondary }]}>Aqui está o seu resumo financeiro.</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo Atual</Text>
        <Text style={styles.balanceValue}>{formatMoney(balance)}</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.smallCard, { backgroundColor: theme.card, borderBottomColor: theme.income }]}>
          <Ionicons name="arrow-up-circle" size={28} color={theme.income} />
          <Text style={[styles.smallCardLabel, { color: theme.textSecondary }]}>Receitas</Text>
          <Text style={[styles.smallCardValue, { color: theme.text }]}>{formatMoney(income)}</Text>
        </View>

        <View style={[styles.smallCard, { backgroundColor: theme.card, borderBottomColor: theme.expense }]}>
          <Ionicons name="arrow-down-circle" size={28} color={theme.expense} />
          <Text style={[styles.smallCardLabel, { color: theme.textSecondary }]}>Despesas</Text>
          <Text style={[styles.smallCardValue, { color: theme.text }]}>{formatMoney(expense)}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Últimas Transações</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Transações')}>
          <Text style={[styles.seeAll, { color: theme.primary }]}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <Text style={{ color: theme.textSecondary, textAlign: 'center', marginTop: 20 }}>
          Você ainda não possui transações.
        </Text>
      ) : (
        transactions.slice(0, 3).map((item) => (
          <View key={item.id} style={[styles.transactionItem, { backgroundColor: theme.card }]}>
            <View style={styles.transactionLeft}>
              <View style={[styles.iconBox, { backgroundColor: item.type === 'income' ? '#E8F8F5' : '#FDEDEC' }]}>
                <Ionicons name={item.type === 'income' ? 'trending-up' : 'trending-down'} size={20} color={item.type === 'income' ? theme.income : theme.expense} />
              </View>
              <View>
                <Text style={[styles.transactionTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.transactionDate, { color: theme.textSecondary }]}>{item.date}</Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, { color: item.type === 'income' ? theme.income : theme.expense }]}>
              {item.type === 'income' ? '+' : '-'} {formatMoney(item.amount)}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  subGreeting: { fontSize: 16, marginTop: 4 },
  balanceCard: { backgroundColor: '#4361EE', padding: 24, borderRadius: 20, marginBottom: 20, shadowColor: '#4361EE', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
  balanceLabel: { color: '#EEF2FF', fontSize: 16, marginBottom: 8 },
  balanceValue: { color: '#FFF', fontSize: 36, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  smallCard: { width: '48%', padding: 20, borderRadius: 15, borderBottomWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  smallCardLabel: { fontSize: 14, marginTop: 8, marginBottom: 4 },
  smallCardValue: { fontSize: 18, fontWeight: 'bold' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { fontWeight: 'bold' },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 1 },
  transactionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  transactionTitle: { fontSize: 16, fontWeight: 'bold' },
  transactionDate: { fontSize: 12, marginTop: 2 },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' }
});