import { default as bettersqlite3 } from 'better-sqlite3';
import  argon2  from 'argon2';

import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { geocode } from '@esri/arcgis-rest-geocoding';
// import {NodeGeocoder} from 'node-geocoder';
import NodeGeocoder from 'node-geocoder';
import e from 'express';




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

 export let getUserByUsername = async (username) => {
   const stmt = await db.prepare("SELECT id, username, password FROM USER WHERE username = ? LIMIT 0, 1");
   try {
       const user = await stmt.get(username);
       return user;
   } catch (err) {
       throw err;
   }
}


export let findUserByUsernamePassword = async (username, password) => {
   //Φέρε μόνο μια εγγραφή (το LIMIT 0, 1) που να έχει username και password ίσο με username και password 
   const stmt = await db.prepare("SELECT username FROM user WHERE username = ? and password = ? LIMIT 0, 1");
   try {
       const user = await stmt.run(username, password);
   } catch (err) {
       throw err;
   }
}

//Η συνάρτηση δημιουργεί έναν νέο χρήστη
export let registerUserNoPass = async function (username) {
   // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
   const userId = getUserByUsername(username);
   if (userId != undefined) {
       return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
   } else {
       try {
           const stmt = await db.prepare('INSERT INTO user VALUES (null, ?, ?, ?, ?, ?, ?, ?)');
           const info = await stmt.run(username, username);
           return info.lastInsertRowid;
       } catch (err) {
           throw err;
       }
   }
}

//Η συνάρτηση δημιουργεί έναν νέο χρήστη με password
export let registerUser = async function (username, password,name, email, phone, com_hours) {
   // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
   const userId = await getUserByUsername(username);
   if (userId != undefined) {
       return { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" };
   } else {
       try {
           const hashedPassword = await argon2.hash(password, 10);
           const stmt = await db.prepare('INSERT INTO user VALUES (null, ?, ?, ?, ?, ?, ?)');
           const info = await stmt.run(username, hashedPassword, name, email, phone, com_hours);
           return info.lastInsertRowid;
       } catch (error) {
           throw error;
       }
   }
}

export let doSubmit_toDB = async function (userID, price, surface, type, address,
    levels=undefined, 
    level=undefined, 
    kitchen=undefined, 
    bathroom=undefined,
    living_room=undefined,
    heating=undefined,
    constr_year=undefined,
    available=undefined,
    desc=undefined,
    location=undefined) {
    try{
        let attr = "(user_id, price, surface, type, address, x, y";
        let nm = "(?, ?, ?, ?, ?, ?, ?"

        // // Setup geocoder with OpenStreetMap
        // const options = {
        //     provider: 'openstreetmap'
        // };

        // const geocoder = NodeGeocoder(options);

        // // Sample address
        // // const address = '1600 Amphitheatre Parkway, Mountain View, CA';
        // const addr = address +", " + location;

        // async function getCoordinates(address) {
        // try {
        //     const res = await geocoder.geocode(address);
        //     console.log(addr)
        //     console.log(res[0].latitude);
        //     console.log(res[0].longitude);
        //     console.log(res[0]);
        //     let x = res[0].latitude;
        //     let y = res[0].longitude;
        //     console.log("res0")
        //     return {x, y};
        //     // Output includes: latitude, longitude, country, city, etc.
        // } catch (err) {
        //     console.error('Geocoding error:', err);
        // }
        // }

        // Setup base geocoder options
        const baseOptions = {
        provider: 'google',
        apiKey: 'AIzaSyAlQLepV6ecLWTbDM2u_CRkM20VIFkVtgk', // Secure in production!
        region: 'gr',
        };

        // Construct full address
        const addr = address + ", " + location;

        // Get coordinates from a specific language
        async function getCoordinatesByLanguage(address, language) {
        const options = {
            ...baseOptions,
            language,
        };

        const geocoder = NodeGeocoder(options);

        try {
            const res = await geocoder.geocode(address);
            if (res && res[0]) {
            return {
                x: res[0].latitude,
                y: res[0].longitude,
                formattedAddress: res[0].formattedAddress,
                language,
            };
            } else {
            throw new Error('No result');
            }
        } catch (err) {
            console.error(`Geocoding error [${language}]:`, err.message);
            return null;
        }
        }

        // Wrapper function returning only { x, y }
        async function getCoordinates(address) {
        const [greek, english] = await Promise.all([
            getCoordinatesByLanguage(address, 'el'),
            getCoordinatesByLanguage(address, 'en'),
        ]);

        // Prefer Greek result, fallback to English
        const result = greek || english;

        if (!result) {
            throw new Error("Failed to geocode address in both languages");
        }

        console.log("Using geocode from:", result.language);
        console.log("Lat:", result.x, "Lng:", result.y);

        return { x: result.x, y: result.y };
        }

        // Usage
        const { x, y } = await getCoordinates(addr);


        console.log(getCoordinates(addr))
        console.log("τεστ")
        console.log(x)
        console.log(y)


        // let x = "";
        // let y ="";

        const params = [userID, price, surface, type, address, x, y];

        if (levels!==undefined || levels!=""){
            attr += ",levels";
            params.push(levels);
            nm +=", ?"
        }
        if (level!==undefined) {
            attr +=", level";
            params.push(level);
            nm +=", ?"
        }
        if (kitchen!==undefined) {
            attr +=", kitchen";
            params.push(kitchen);
            nm +=", ?"
        }
        if (bathroom!==undefined) {
            attr +=", bathroom";
            params.push(bathroom);
            nm +=", ?"
        }
        if (living_room!==undefined) {
            attr +=", living_room";
            params.push(living_room);
            nm +=", ?"
        }
        if (heating!==undefined) {
            attr +=", heating";
            params.push(heating);
            nm +=", ?"
        }
        if (constr_year!==undefined) {
            attr +=", constr_year";
            params.push(constr_year);
            nm +=", ?"
        }
        if (available!==undefined) {
            attr +=", available";
            params.push(available);
            nm +=", ?"
        }
        if (desc!==undefined) {
            attr +=", desc";
            params.push(desc);
            nm +=", ?"
        }
        if (location!==undefined) {
            attr +=", location";
            params.push(location);
            nm +=", ?"
        }

        attr +=")"
        nm +=")"

        let quer="INSERT INTO AKINITO "+attr+ "VALUES" + nm;
        const insert = db.prepare(quer);
        const result = insert.run(...params);

        console.log('Inserted ID:', result.lastInsertRowid);

    }
    catch(err){
        console.log("ERRORRRR!!!")
        console.log(err)
    }
 }



 export let findUserById = async function(userId){
    let quer = "SELECT * FROM USER WHERE ID=?"
    const insert = db.prepare(quer);
    const result = await insert.get(userId);

    return result
 }

 export let findPropByUserId = async function(userId){
    let quer = "SELECT * FROM AKINITO WHERE USER_ID=?"
    const insert = db.prepare(quer);
    const result = await insert.all(userId);

    return result
 }

 export let findLikedPropByUserId = async function(userId){
    let quer = "SELECT p.* FROM ARESEI a JOIN AKINITO p ON a.prop_id = p.prop_id WHERE a.buyer_id = ?;"
    const insert = db.prepare(quer);
    const result = await insert.all(userId);

    return result
 }


 export let likeProp = async function(userId, propId){
    let quer = "INSERT INTO ARESEI VALUES (?,?) "
    const insert = db.prepare(quer);
    const result = insert.run(userId, propId);
 }

export let unlikeProp = async function(userId, propId) {
    let query = "DELETE FROM ARESEI WHERE buyer_id = ? AND prop_id = ?";
    const del = db.prepare(query);
    const result = del.run(userId, propId);
};