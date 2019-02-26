import PouchDB from 'pouchdb';
import { name } from '../../package.json';

const db = new PouchDB(name);

export default db;
