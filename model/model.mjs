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

const findAkinito=(place, tp, min_value, max_value, min_srface, max_srface) =>{
   const stmt = db.prepare("SELECT * FROM AKINITO WHERE location = ? AND type = ? AND price>=? AND price<=? AND surface >= ? AND surface <= ?");
    let tasks;
    try {
        tasks = stmt.all(place, tp, min_value, max_value, min_srface, max_srface);
        return tasks;
    } catch (err) {
        throw err;
    }
}
 

function shutdown() {
    try {
       db.close();
       console.log('Έκλεισε η σύνδεση με την SQLite.');
    } catch (err) {
       throw err;
    }
 }

 export{getAkinito, findAkinito}