import { createContext, useState } from 'react';

export const EditItemContext = createContext({
  item: null,
  setItem: () => {},
});

export const EditItemProvider = (props) => {
  const [editItem, setEditItem] = useState(null);

  const editItemContext = {
    item: editItem,
    setItem: setEditItem,
  };

  return (
    <EditItemContext.Provider value={editItemContext}>
      {props.children}
    </EditItemContext.Provider>
  );
};
