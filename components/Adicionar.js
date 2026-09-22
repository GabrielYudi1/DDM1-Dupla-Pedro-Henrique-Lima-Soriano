import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FinanceContext } from '../FinanceContext';
import { ThemeContext } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Adicionar({ navigation }) {
  const { addTransaction } = useContext(FinanceContext);
  const { theme } = useContext(ThemeContext);
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numericAmount)) {
      Alert.alert('Erro', 'Insira um valor numérico válido.');
      return;
    }

    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth()+1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    addTransaction({ title, amount: numericAmount, type, date: dateStr });

    setTitle('');
    setAmount('');
    navigation.navigate('Dashboard');
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: theme.background }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={[styles.headerTitle, { color: theme.text }]}>Novo Registro</Text>

      <View style={styles.typeContainer}>
        <TouchableOpacity 
          style={[styles.typeButton, { backgroundColor: theme.card, borderColor: theme.border }, type === 'income' && { backgroundColor: theme.income, borderColor: theme.income }]}
          onPress={() => setType('income')}
        >
          <Ionicons name="arrow-up-circle-outline" size={20} color={type === 'income' ? '#FFF' : theme.income} />
          <Text style={[styles.typeText, { color: theme.text }, type === 'income' && styles.typeTextActive]}>Receita</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.typeButton, { backgroundColor: theme.card, borderColor: theme.border }, type === 'expense' && { backgroundColor: theme.expense, borderColor: theme.expense }]}
          onPress={() => setType('expense')}
        >
          <Ionicons name="arrow-down-circle-outline" size={20} color={type === 'expense' ? '#FFF' : theme.expense} />
          <Text style={[styles.typeText, { color: theme.text }, type === 'expense' && styles.typeTextActive]}>Despesa</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: theme.textSecondary }]}>Descrição</Text>
      <View style={[styles.inputContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="text-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Ex: Mercado"
          placeholderTextColor={theme.textSecondary}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <Text style={[styles.label, { color: theme.textSecondary }]}>Valor (R$)</Text>
      <View style={[styles.inputContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="cash-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Ex: 150.50"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.primary }]} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  typeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  typeButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderWidth: 1, borderRadius: 10, marginHorizontal: 5 },
  typeText: { fontSize: 16, fontWeight: '600', marginLeft: 8 },
  typeTextActive: { color: '#FFF' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, marginBottom: 20, borderWidth: 1 },
  inputIcon: { padding: 15 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16 },
  saveButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, elevation: 5 },
  saveButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});