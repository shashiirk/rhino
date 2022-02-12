import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';

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
          <Switch>
            <Route exact path="/">
              <Main isInitial={isInitial} user={props.user} />
            </Route>
            <Route exact path="/add-income">
              <AddIncome />
            </Route>
            <Route exact path="/add-expenses">
              <AddExpenses />
            </Route>
            <Route exact path="/edit-income">
              <EditIncome />
            </Route>
            <Route exact path="/edit-expenses">
              <EditExpenses />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </CurrentTypeProvider>
      </EditItemProvider>
    </TransactionsProvider>
  );
};

export default SignedIn;
