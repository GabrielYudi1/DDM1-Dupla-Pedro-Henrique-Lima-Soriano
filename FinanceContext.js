import React, { createContext, useState } from 'react';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([{ id: Date.now().toString(), ...transaction }, ...transactions]);
  };
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addGoal = (goal) => {
    setGoals([{ id: Date.now().toString(), ...goal }, ...goals]);
  };
  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const clearAllData = () => {
    setTransactions([]);
    setGoals([]);
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, addTransaction, deleteTransaction, 
      goals, addGoal, deleteGoal, 
      clearAllData 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};