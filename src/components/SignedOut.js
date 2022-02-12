import { Route, Switch } from 'react-router';

import SignIn from './SignIn';
import Error from './Error';

const SignedOut = () => {
  return (
    <Switch>
      <Route exact path="/">
        <SignIn />
      </Route>
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  );
};

export default SignedOut;
