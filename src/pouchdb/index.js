import PouchDB from 'pouchdb';
import { name } from '../../package.json';

const db = new PouchDB(name);
 db.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
  console.log('change', change);
}).on('complete', function(info) {
  console.log('complete', info);
}).on('error', function (err) {
  console.log('error', err);
});

export default db;
