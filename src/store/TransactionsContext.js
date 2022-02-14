import { createContext, useContext, useEffect, useState } from 'react';
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';

import { db } from '../services/firebase-config';
import { AuthContext } from './AuthContext';

export const TransactionsContext = createContext({
  income: [],
  expenses: [],
  loading: null,
});

export const TransactionsProvider = (props) => {
  const [incomeItems, setIncomeItems] = useState([]);
  const [expensesItems, setExpensesItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, authCtx.user.uid), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const incomeItemsList = [];
      const expensesItemsList = [];

      snapshot.docs.forEach((doc) => {
        if (doc.data().amount > 0) {
          incomeItemsList.push({
            id: doc.id,
            amount: doc.data().amount,
            category: doc.data().category,
            date: doc.data().date.toDate().toDateString(),
            note: doc.data().note,
          });
        } else {
          expensesItemsList.push({
            id: doc.id,
            amount: doc.data().amount,
            category: doc.data().category,
            date: doc.data().date.toDate().toDateString(),
            note: doc.data().note,
          });
        }
      });

      setIncomeItems(incomeItemsList);
      setExpensesItems(expensesItemsList);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [authCtx.user.uid]);

  const transactionsContext = {
    income: incomeItems,
    expenses: expensesItems,
    loading: isLoading,
  };

  return (
    <TransactionsContext.Provider value={transactionsContext}>
      {props.children}
    </TransactionsContext.Provider>
  );
};
