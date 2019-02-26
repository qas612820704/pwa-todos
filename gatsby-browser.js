import createWrapRedux from './src/layout/createWrapRedux';
import db from './src/pouchdb';

export const wrapRootElement = createWrapRedux({ thunkExtraArgument: { db } });

export const onClientEntry = () => {
  localStorage.debug = 'pwa-todos:*,axios';
}
