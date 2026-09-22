import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { FinanceContext } from '../FinanceContext';
import { Ionicons } from '@expo/vector-icons';

export default function Configuracoes() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { clearAllData } = useContext(FinanceContext);
  
  const [modalVisible, setModalVisible] = useState(false);

  const confirmarExclusao = () => {
    clearAllData();          
    setModalVisible(false);  
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Preferências</Text>

      <View style={[styles.optionRow, { backgroundColor: theme.card }]}>
        <View style={styles.optionLeft}>
          <Ionicons name={theme.isDark ? "moon" : "sunny"} size={24} color={theme.primary} />
          <Text style={[styles.optionText, { color: theme.text }]}>Modo Escuro (Dark Mode)</Text>
        </View>
        <Switch
          value={theme.isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: theme.primaryLight }}
          thumbColor={theme.isDark ? theme.primary : "#f4f3f4"}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.textSecondary, marginTop: 25 }]}>Gerenciamento de Dados</Text>

      <TouchableOpacity 
        style={[styles.optionRow, { backgroundColor: theme.card }]} 
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.optionLeft}>
          <Ionicons name="trash-bin" size={24} color={theme.expense} />
          <View>
            <Text style={[styles.optionText, { color: theme.expense, fontWeight: 'bold' }]}>Apagar todos os dados</Text>
            <Text style={[styles.subText, { color: theme.textSecondary }]}>Zera transações e metas.</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { color: theme.textSecondary, marginTop: 25 }]}>Sobre o FinanSys</Text>
      
      <View style={[styles.aboutCard, { backgroundColor: theme.card }]}>
        <Ionicons name="wallet" size={40} color={theme.primary} style={{marginBottom: 10}}/>
        <Text style={[styles.aboutTitle, { color: theme.text }]}>FinanSys App</Text>
        <Text style={[styles.aboutVersion, { color: theme.textSecondary }]}>Versão 1.0.0</Text>
        <Text style={[styles.aboutDesc, { color: theme.textSecondary }]}>
          Seu gerenciador financeiro completo. Construído com React Native.
        </Text>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            
            <View style={[styles.iconCirculo, { backgroundColor: '#FDEDEC' }]}>
              <Ionicons name="warning" size={32} color={theme.expense} />
            </View>
            
            <Text style={[styles.modalTitle, { color: theme.text }]}>Atenção!</Text>
            <Text style={[styles.modalText, { color: theme.textSecondary }]}>
              Tem certeza que deseja apagar TODAS as transações e metas? Esta ação não pode ser desfeita.
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity 
                style={[styles.btnModal, styles.btnCancel]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.btnTextCancel, { color: theme.textSecondary }]}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.btnModal, { backgroundColor: theme.expense }]} 
                onPress={confirmarExclusao}
              >
                <Text style={styles.btnTextDelete}>Sim, Apagar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, marginLeft: 5 },
  optionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 18, borderRadius: 15, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 1,
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionText: { fontSize: 16, marginLeft: 15 },
  subText: { fontSize: 12, marginLeft: 15, marginTop: 2 },
  aboutCard: {
    padding: 25, borderRadius: 15, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 1,
  },
  aboutTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  aboutVersion: { fontSize: 14, marginBottom: 15 },
  aboutDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '85%', padding: 25, borderRadius: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 5 },
  iconCirculo: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 25 },
  modalButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  btnModal: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 5 },
  btnCancel: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#CCC' },
  btnTextCancel: { fontSize: 15, fontWeight: 'bold' },
  btnTextDelete: { fontSize: 15, fontWeight: 'bold', color: '#FFF' },
});