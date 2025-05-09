import express from 'express';
import exphbs from 'express-handlebars';

const model = await import(`../model/model.mjs`);


let getMainPage = function(req, res) {
    try{
        
        const akinita = model.getAkinito();
        console.log(akinita);
        res.render('srcbar')
    }
    catch(err){
        res.send(err.message)
    }
}

let getSearchPage = function(req, res) {
    try{
        // res.send("Page")
        res.render('places')
    }
    catch(err){
        res.send(err.message)
    }
}


export {getMainPage, getSearchPage};