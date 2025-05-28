import express from 'express';
import exphbs from 'express-handlebars';

// import { Property as myProperty } from '../model/createObj.js'


const model = await import(`../model/model.mjs`);


let getMainPage = function(req, res) {
    try{
        
        const akinita = model.getAkinito();
        res.render('srcbar')
    }
    catch(err){
        res.send(err.message)
    }
}

// let getSearchPage =  async function(req, res) {
//     try{
//         let spitia;
//         if (req.query.perioxi==undefined & req.query.katidoria == undefined & req.query.min_price==undefined & req.query.max_price==undefined & req.query.min_emvadon==undefined & req.query.max_emvadon==undefined){
//             spitia = model.getAkinito();
//         }

//         else if (req.query.perioxi!="" || req.query.katidoria != "none" || req.query.min_price!="" || req.query.max_price!="" || req.query.min_emvadon!="" ||req.query.max_emvadon!=""){
//             spitia = model.findAkinito(req.query.perioxi,req.query.katidoria,req.query.min_price,req.query.max_price,req.query.min_emvadon, req.query.max_emvadon);            

//         }
//         else{
//             spitia = model.getAkinito();
//         }

//         if (req.session.loggedUserId){
//             let likedProperties = await model.findLikedPropByUserId(req.session.loggedUserId) || [];
//             const likedIds = likedProperties.map(p => p.id);

//             // Add 'liked' flag to each property
//             spitia = spitia.map(p => ({
//                 ...p,
//                 liked: likedIds.includes(p.prop_id)
//             }));
//             res.render('places', {properties: spitia, prop:JSON.stringify(spitia)});
//         }
//         else{
//             // No logged-in user
//             spitia = spitia.map(p => ({
//                 ...p,
//                 liked: false
//             }));
//             res.render('places', {properties: spitia, prop:JSON.stringify(spitia)});
//         }
//     }
//     catch(err){
//         res.send(err.message)
//     }
// }
let getSearchPage = async function(req, res) {
  try {
    let spitia;

    // Await model calls assuming they return promises
    if (
      req.query.perioxi === undefined &&
      req.query.katidoria === undefined &&
      req.query.min_price === undefined &&
      req.query.max_price === undefined &&
      req.query.min_emvadon === undefined &&
      req.query.max_emvadon === undefined
    ) {
      spitia = await model.getAkinito();
    } else if (
      req.query.perioxi !== "" ||
      req.query.katidoria !== "none" ||
      req.query.min_price !== "" ||
      req.query.max_price !== "" ||
      req.query.min_emvadon !== "" ||
      req.query.max_emvadon !== ""
    ) {
      spitia = await model.findAkinito(
        req.query.perioxi,
        req.query.katidoria,
        req.query.min_price,
        req.query.max_price,
        req.query.min_emvadon,
        req.query.max_emvadon
      );
    } else {
      spitia = await model.getAkinito();
    }

    if (req.session.loggedUserId) {
      let likedProperties = (await model.findLikedPropByUserId(req.session.loggedUserId)) || [];

      // Use correct property key for likedProperties array elements — you showed prop_id before
      const likedIds = likedProperties.map(p => p.prop_id);

      // Add 'liked' flag to each property
      spitia = spitia.map(p => ({
        ...p,
        liked: likedIds.includes(p.prop_id),
      }));

      // 🔽 STEP 2: Sort if sort parameter exists
      if (req.query.sort) {
        const sortKeyMap = {
          price_asc: ['price', 'asc'],
          price_desc: ['price', 'desc'],
          surface_asc: ['surface', 'asc'],
          surface_desc: ['surface', 'desc'],
          constr_year_asc: ['constr_year', 'asc'],
          constr_year_desc: ['constr_year', 'desc']
        };

        const [key, dir] = sortKeyMap[req.query.sort] || [];
        if (key && dir) {
          spitia.sort((a, b) => {
            if (dir === 'asc') return a[key] - b[key];
            else return b[key] - a[key];
          });
        }
      }
      // Helper: Create human-readable sort label for display
      function getSortLabel(sortValue) {
        const map = {
          price_asc: "Τιμή ↑",
          price_desc: "Τιμή ↓",
          surface_asc: "Επιφάνεια ↑",
          surface_desc: "Επιφάνεια ↓",
          constr_year_asc: "Έτος κατασκευής ↑",
          constr_year_desc: "Έτος κατασκευής ↓"
        };
        return map[sortValue] || null;
      }

      res.render("places", {
        properties: spitia,
        prop: JSON.stringify(spitia),
        userId: req.session.loggedUserId,
        currentSortLabel: getSortLabel(req.query.sort)
      });    
      } else {
      spitia = spitia.map(p => ({
        ...p,
        liked: false,
      }));

      // 🔽 STEP 2: Sort if sort parameter exists
      if (req.query.sort) {
        const sortKeyMap = {
          price_asc: ['price', 'asc'],
          price_desc: ['price', 'desc'],
          surface_asc: ['surface', 'asc'],
          surface_desc: ['surface', 'desc'],
          constr_year_asc: ['constr_year', 'asc'],
          constr_year_desc: ['constr_year', 'desc']
        };

        const [key, dir] = sortKeyMap[req.query.sort] || [];
        if (key && dir) {
          spitia.sort((a, b) => {
            if (dir === 'asc') return a[key] - b[key];
            else return b[key] - a[key];
          });
        }
      }
      // Helper: Create human-readable sort label for display
      function getSortLabel(sortValue) {
        const map = {
          price_asc: "Τιμή ↑",
          price_desc: "Τιμή ↓",
          surface_asc: "Επιφάνεια ↑",
          surface_desc: "Επιφάνεια ↓",
          constr_year_asc: "Έτος κατασκευής ↑",
          constr_year_desc: "Έτος κατασκευής ↓"
        };
        return map[sortValue] || null;
      }
      res.render('places', { properties: spitia, prop: JSON.stringify(spitia), userId: null, currentSortLabel: getSortLabel(req.query.sort)});
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

let showSubmit = function(req, res){
    try{
        res.render('submit')
    }
    catch(err){res.send(err.message)}
}

let doSubmit = function(req, res){
    try{
        const akinita = model.doSubmit_toDB(req.session.loggedUserId, 
            req.body.price, 
            req.body.surface,
            req.body.type,
            req.body.address,
            req.body.levels,
            req.body.level,
            req.body.kitchen,
            req.body.bathroom,
            req.body.living_room,
            req.body.heating,
            req.body.constr_year,
            req.body.available,
            req.body.desc,
            req.body.location,
            );
            const redirectTo = req.session.originalUrl || '/';
 
            res.redirect(redirectTo);
    }
    catch(err){res.send(err.message)}
}

export let showProfile = async function(req, res) {
    try{

        const userId = req.session.loggedUserId;
        if (!userId) {
          res.redirect('/login');
        }
        let us = await model.findUserById(req.session.loggedUserId)
        let pr = await model.findPropByUserId(req.session.loggedUserId)
        let like = await model.findLikedPropByUserId(req.session.loggedUserId)


        res.render('profile', {user: us, prop: pr, liked: like})
    }
    catch(err){res.send(err.message)}
}

export let likeProp = async function(req, res) {
    try {
        await model.likeProp(req.session.loggedUserId, req.body.propertyId);
        res.status(200).json({ success: true, liked: true }); // ✅ JSON response
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export let unlikeProp = async function(req, res) {
    try {
        await model.unlikeProp(req.session.loggedUserId, req.body.propertyId);
        res.status(200).json({ success: true, liked: false }); // ✅ JSON response
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export let changeProfile = async function (req, res) {
  try {
    const userId = req.session.loggedUserId;
    if (!userId) {
      res.redirect('/login');
    }

    const { username, password, name_sur, email, tel, comm_hours } = req.body;


    const result = await model.editProfile(userId, username, password, name_sur, email, tel, comm_hours);

    if (result.changes === 0) {
      return res.status(404).send("User not found or no changes made.");
    }
    res.redirect('/profile');
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).send("Server error.");
  }
};



export {getMainPage, getSearchPage, showSubmit, doSubmit};