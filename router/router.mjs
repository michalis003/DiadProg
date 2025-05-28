import express from 'express';
import * as controller from '../controller/controllers.mjs'; // import the controller
import * as controllerLogin from '../controller/login_controllers.mjs'; // import the controller

const router = express.Router();


router.get('/', controller.getMainPage); 
router.get('/searchPage',controller.getSearchPage);

// Login/ Logout
router.get('/login', controllerLogin.showLogInForm);
router.post('/login', controllerLogin.doLogin);
router.post('/logout', controllerLogin.doLogout);

// Register
router.get('/register', controllerLogin.showRegisterForm);
router.post('/register', controllerLogin.doRegister);

// Submit
router.get('/submit', controllerLogin.checkAuthenticated, controller.showSubmit);
router.post('/submit', controllerLogin.checkAuthenticated, controller.doSubmit);

// Profile
router.get('/profile', controller.showProfile)

// Like-Unlike
router.post("/like", controller.likeProp)
router.post('/unlike', controller.unlikeProp)

//Edit Profile
router.post('/editProfile', controller.changeProfile)

export{ router };