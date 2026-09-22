import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FinanceContext } from '../FinanceContext';
import { ThemeContext } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Metas() {
  const { transactions, goals, addGoal, deleteGoal } = useContext(FinanceContext);
  const { theme } = useContext(ThemeContext);

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const currentBalance = income - expense;

  const formatMoney = (value) => {
    let [intPart, decimalPart] = value.toFixed(2).split('.');
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${intPart},${decimalPart}`;
  };

  const handleAddGoal = () => {
    if (!title || !targetAmount) return Alert.alert('Erro', 'Preencha os campos da meta!');
    const amount = parseFloat(targetAmount.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) return Alert.alert('Erro', 'Valor inválido.');

    addGoal({ title, amount });
    setTitle('');
    setTargetAmount('');
  };

  const renderGoal = ({ item }) => {
    const progress = Math.max(0, Math.min((currentBalance / item.amount) * 100, 100));
    const progressColor = progress >= 100 ? theme.income : theme.primary;

    return (
      <View style={[styles.goalCard, { backgroundColor: theme.card }]}>
        <View style={styles.goalHeader}>
          <Text style={[styles.goalTitle, { color: theme.text }]}>{item.title}</Text>
          <TouchableOpacity onPress={() => deleteGoal(item.id)}>
            <Ionicons name="close-circle" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.goalText, { color: theme.textSecondary }]}>
          {formatMoney(currentBalance)} / {formatMoney(item.amount)}
        </Text>
        
        <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
          <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: progressColor }]} />
        </View>
        <Text style={[styles.progressPercent, { color: progressColor }]}>{progress.toFixed(0)}% Alcançado</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <View style={[styles.addGoalContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.addGoalTitle, { color: theme.text }]}>Criar nova Meta</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
          placeholder="Ex: Comprar PC"
          placeholderTextColor={theme.textSecondary}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.border }]}
          placeholder="Valor alvo (R$)"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={targetAmount}
          onChangeText={setTargetAmount}
        />
        <TouchableOpacity style={[styles.btnAction, { backgroundColor: theme.primary }]} onPress={handleAddGoal}>
          <Text style={styles.btnActionText}>Adicionar Meta</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.listTitle, { color: theme.text }]}>Minhas Metas</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={renderGoal}
        ListEmptyComponent={<Text style={{ color: theme.textSecondary, marginTop: 10 }}>Nenhuma meta criada ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  addGoalContainer: { padding: 20, borderRadius: 15, borderWidth: 1, marginBottom: 20 },
  addGoalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 10 },
  btnAction: { padding: 15, borderRadius: 8, alignItems: 'center' },
  btnActionText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  listTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  goalCard: { padding: 20, borderRadius: 15, marginBottom: 15, elevation: 2 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  goalTitle: { fontSize: 16, fontWeight: 'bold' },
  goalText: { fontSize: 14, marginBottom: 10 },
  progressBarBg: { height: 10, borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  progressBarFill: { height: '100%', borderRadius: 5 },
  progressPercent: { fontSize: 12, fontWeight: 'bold', textAlign: 'right' }
});