import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FinanceContext } from '../FinanceContext';
import { ThemeContext } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Transacoes() {
  const { transactions, deleteTransaction } = useContext(FinanceContext);
  const { theme } = useContext(ThemeContext);

  const formatMoney = (value) => {
    let [intPart, decimalPart] = value.toFixed(2).split('.');
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${intPart},${decimalPart}`;
  };

  const renderItem = ({ item }) => (
    <View style={[styles.transactionItem, { backgroundColor: theme.card }]}>
      <View style={styles.transactionLeft}>
        <View style={[styles.iconBox, { backgroundColor: item.type === 'income' ? '#E8F8F5' : '#FDEDEC' }]}>
          <Ionicons name={item.type === 'income' ? 'trending-up' : 'trending-down'} size={24} color={item.type === 'income' ? theme.income : theme.expense} />
        </View>
        <View>
          <Text style={[styles.transactionTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.transactionDate, { color: theme.textSecondary }]}>{item.date}</Text>
        </View>
      </View>
      
      <View style={styles.transactionRight}>
        <Text style={[styles.transactionAmount, { color: item.type === 'income' ? theme.income : theme.expense }]}>
          {item.type === 'income' ? '+' : '-'} {formatMoney(item.amount)}
        </Text>
        <TouchableOpacity onPress={() => deleteTransaction(item.id)} style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={20} color={theme.expense} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {transactions.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={60} color={theme.textSecondary} />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Nenhuma transação registrada.</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  transactionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  transactionTitle: { fontSize: 16, fontWeight: 'bold' },
  transactionDate: { fontSize: 13, marginTop: 4 },
  transactionRight: { flexDirection: 'row', alignItems: 'center' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold', marginRight: 15 },
  deleteBtn: { padding: 5 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, marginTop: 10 }
});