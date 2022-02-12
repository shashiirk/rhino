import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import Main from './Main';
import AddIncome from './AddIncome';
import AddExpenses from './AddExpenses';
import EditIncome from './EditIncome';
import EditExpenses from './EditExpenses';
import Error from './Error';
import { TransactionsProvider } from '../store/TransactionsContext';
import { EditItemProvider } from '../store/EditItemContext';
import { CurrentTypeProvider } from '../store/CurrentTypeContext';

const SignedIn = (props) => {
  const [isInitial, setIsInitial] = useState(false);

  useEffect(() => {
    setIsInitial(true);
    setTimeout(() => {
      setIsInitial(false);
    }, 800);
  }, []);

  return (
    <TransactionsProvider>
      <EditItemProvider>
        <CurrentTypeProvider>
          <Routes>
            <Route
              path="/"
              element={<Main isInitial={isInitial} user={props.user} />}
            />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/add-expenses" element={<AddExpenses />} />
            <Route path="/edit-income" element={<EditIncome />} />
            <Route path="/edit-expenses" element={<EditExpenses />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </CurrentTypeProvider>
      </EditItemProvider>
    </TransactionsProvider>
  );
};

export default SignedIn;
