import React from 'react'
import { StoreContext } from 'redux-react-hook';

import { createStore } from "../redux";

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore()
  return (
    <StoreContext.Provider value={store}>
    { element }
    </StoreContext.Provider>
  );
}
