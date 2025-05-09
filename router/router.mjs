import express from 'express';
import * as controller from '../controller/controllers.mjs'; // import the controller

const router = express.Router();


router.get('/', controller.getMainPage); 
router.get('/searchPage',controller.getSearchPage);

export{ router };