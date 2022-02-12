import { useContext } from 'react';
import styled from 'styled-components';

import HelmetContent from './components/HelmetContent';
import Loading from './components/Loading';
import SignedIn from './components/SignedIn';
import SignedOut from './components/SignedOut';
import Offline from './components/Offline';

import { OnlineStatusContext } from './store/OnlineStatusContext';
import { AuthContext } from './store/AuthContext';
import { ThemeContext } from './store/ThemeContext';

import GlobalStyle from './globalStyles';

const Container = styled.div`
  /* border: 1px blue solid; */
  &.dark {
    background-color: #202831;
    color: #e8e9ea;
  }

  background-color: #f6f4f7;
  max-width: 500px;
  width: 100%;
  padding: 16px;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => {
  const onlineStatusCtx = useContext(OnlineStatusContext);
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);

  return (
    <>
      <HelmetContent />
      <GlobalStyle dark={themeCtx.dark} />
      <Container className={themeCtx.dark ? 'dark' : ''}>
        {onlineStatusCtx ? (
          authCtx.loading ? (
            <Loading />
          ) : !!authCtx.user ? (
            <SignedIn user={authCtx.user} />
          ) : (
            <SignedOut />
          )
        ) : (
          <Offline />
        )}
      </Container>
    </>
  );
};

export default App;
