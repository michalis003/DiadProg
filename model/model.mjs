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

const findAkinito = (place, tp, min_value, max_value, min_srface, max_srface) => {
   let sql = "SELECT * FROM AKINITO WHERE 1=1";
   const params = [];

   if (place) {
       sql += " AND location = ?";
       params.push(place)
   }

   if (tp != 1) {
      console.log("katigoria")
       sql += " AND type = ?";
       params.push(tp);
   }

   if (min_value !== undefined && min_value !== "") {
       sql += " AND price >= ?";
       params.push(min_value);
   }

   if (max_value !== undefined && max_value !== "") {
       sql += " AND price <= ?";
       params.push(max_value);
   }

   if (min_srface !== undefined && min_srface !== "") {
       sql += " AND surface >= ?";
       params.push(min_srface);
   }

   if (max_srface !== undefined && max_srface !== "") {
       sql += " AND surface <= ?";
       params.push(max_srface);
   }

   const stmt = db.prepare(sql);
   return stmt.all(...params);
};

function shutdown() {
    try {
       db.close();
       console.log('Έκλεισε η σύνδεση με την SQLite.');
    } catch (err) {
       throw err;
    }
 }

 export{getAkinito, findAkinito}