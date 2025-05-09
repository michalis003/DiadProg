// Express.js
import express from 'express'
// Handlebars (https://www.npmjs.com/package/express-handlebars)
import { engine } from 'express-handlebars'




const app = express()
// const router = express.Router();
const port = process.env.PORT || '3000';

app.use(express.static('static'))

app.engine('hbs', engine({ extname: 'hbs', defaultLayout:'main.hbs'}));

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));



import { router } from './router/router.mjs'; // import the router from router.mjs

app.use('/', router);



const server = app.listen(port, () => { console.log(`http://127.0.0.1:${port}`) });

