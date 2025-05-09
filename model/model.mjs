import { default as bettersqlite3 } from 'better-sqlite3';

const db = new bettersqlite3(`${import.meta.dirname}/../data/database.db`, { fileMustExist: true });
console.log(import.meta.dirname);
console.log(`${import.meta.dirname}/../data/database.db`);

const getAkinito=() =>{
    try {

        const getAkinitoStm = db.prepare('SELECT * FROM AKINITO');
        
        return getAkinitoStm.all();
     } catch (err) {
        throw err;
     }
}

console.log(getAkinito());



function shutdown() {
    try {
       db.close();
       console.log('Έκλεισε η σύνδεση με την SQLite.');
    } catch (err) {
       throw err;
    }
 }

 export{getAkinito}