// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'




const app = express()
const router = express.Router();
const port = process.env.PORT || '3000';


// Δηλώνουμε πως ο φάκελος "public" θα περιέχει τα στατικά αρχεία, π.χ. το http://127.0.0.1:3000/style.css θα επιστρέψει το αρχείο /public/style.css
// Specify that the "public" folder will contain the static files, e.g. http://127.0.0.1:3000/style.css will return the file /public/style.css
app.use(express.static('static'))

// Χρήση της Handlebars σαν template engine. Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, για να αναγνωριστεί το extname (το κάνουμε αυτό για να έχουμε αρχεία με κατάληξη .hbs / το default είναι .handlebars)
// Use Handlebars as a template engine. Note: the engine must have the same name as the extname, in order for the extname to be recognized (we do this to have files ending in .hbs / the default is .handlebars)
app.engine('hbs', engine({ extname: 'hbs', defaultLayout:'main.hbs'}));

// Ορίζουμε πως η 'hbs' θα είναι η μηχανή template (δηλ. αυτή που θα χρησιμοποιείται με την res.render()) 
// Set 'hbs' to be the template engine (i.e. the engine that will be used by res.render())
app.set('view engine', 'hbs');


let getMainPage = function(req, res) {
    try{
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


// Χρησιμοποίησε το αντικείμενο δρομολόγησης `router` 
// load the router 'routeρ'
app.use(router);

// Όρισε δύο διαδρομές
// Define two routes
router.route('/').get(getMainPage);
router.route('/searchPage').get(getSearchPage);


const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });

