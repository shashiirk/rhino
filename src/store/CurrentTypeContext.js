import { createContext, useState } from 'react';

export const CurrentTypeContext = createContext({
  currentType: 'income',
  setCurrentType: () => {},
});

export const CurrentTypeProvider = (props) => {
  const [currentType, setCurrentType] = useState('income');

  const currentTypeContext = {
    currentType: currentType,
    setCurrentType: setCurrentType,
  };

  return (
    <CurrentTypeContext.Provider value={currentTypeContext}>
      {props.children}
    </CurrentTypeContext.Provider>
  );
};
