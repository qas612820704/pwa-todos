import React from 'react'
import { StoreContext } from 'redux-react-hook';

import { createStore } from "../redux";

// eslint-disable-next-line react/display-name,react/prop-types
export default (options = {}) => {
  const store = createStore(options);

  return ({ element }) => (
    <StoreContext.Provider value={store}>
    { element }
    </StoreContext.Provider>
  );
}
