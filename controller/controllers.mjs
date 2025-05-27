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

let getSearchPage = function(req, res) {
    try{
        let spitia;
        if (req.query.perioxi!="" || req.query.katidoria != "none" || req.query.min_price!="" || req.query.max_price!="" || req.query.min_emvadon!="" ||req.query.max_emvadon!=""){
            spitia = model.findAkinito(req.query.perioxi,req.query.katidoria,req.query.min_price,req.query.max_price,req.query.min_emvadon, req.query.max_emvadon);            

            console.log("test2");
            console.log(req.session.loggedUserId);
        }
        else{
            spitia = model.getAkinito();
            console.log("test");
            console.log(req.session.loggedUserId);

        }
        res.render('places', {properties: spitia, prop:JSON.stringify(spitia)})
    }
    catch(err){
        res.send(err.message)
    }
}

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


export {getMainPage, getSearchPage, showSubmit, doSubmit};