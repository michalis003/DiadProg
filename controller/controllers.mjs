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
        }
        else{
            spitia = model.getAkinito();
        }
        res.render('places', {properties: spitia})
    }
    catch(err){
        res.send(err.message)
    }
}




export {getMainPage, getSearchPage};