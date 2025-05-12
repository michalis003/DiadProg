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
            console.log("Inside if");
            console.log(req.query.perioxi);
            console.log(req.query.katidoria);
            console.log(req.query.min_price);
            console.log(req.query.max_price);
            console.log(req.query.min_emvadon);
            console.log(req.query.max_emvadon);
            spitia = model.findAkinito(req.query.perioxi,req.query.katidoria,req.query.min_price,req.query.max_price,req.query.min_emvadon, req.query.max_emvadon);
            // console.log(spitia)
            
        }
        else{
            spitia = model.getAkinito();
            console.log("inside else");
            console.log(spitia);
        }

        // res.send("Page")
        res.render('places', {properties: spitia})
    }
    catch(err){
        res.send(err.message)
    }
}




export {getMainPage, getSearchPage};