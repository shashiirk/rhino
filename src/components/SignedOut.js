import { Route, Routes } from 'react-router';

import SignIn from './SignIn';
import Error from './Error';

const SignedOut = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default SignedOut;
