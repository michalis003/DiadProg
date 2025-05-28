import argon2d from 'argon2';


const model = await import(`../model/model.mjs`);


export let showLogInForm = function (req, res) {
    res.render('login', { model: process.env.MODEL });
 };
 
 export let showRegisterForm = function (req, res) {
    res.render('register-password', {});
 };
 
 export let doRegister = async function (req, res) {
   console.log("Do Register Func")
   console.log(req.body)
    try {
       const registrationResult = await model.registerUser(req.body.username, req.body.password, req.body.namesur, req.body.email, req.body.phone, req.body.com_time);
       if (registrationResult?.message) {
          res.render('register-password', { message: registrationResult.message });
       } else {
          res.render('login', { model: process.env.MODEL });
       }
    } catch (error) {
       throw error;
    }
 };
 
 export let doLogin = async function (req, res) {
    //Ελέγχει αν το username και το password είναι σωστά και εκτελεί την
    //συνάρτηση επιστροφής authenticated
 
    const user = await model.getUserByUsername(req.body.username);
    if (user == undefined || !user.password || !user.id) {
       res.render('login', { message: 'Δε βρέθηκε αυτός ο χρήστης' });
    } else {
       const match = await argon2d.verify(user.password, req.body.password ?? "");
       if (match) {
          //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
          console.log(user.id)
          req.session.loggedUserId = user.id;
          //Αν έχει τιμή η μεταβλητή req.session.originalUrl, αλλιώς όρισέ τη σε "/"
          // res.redirect("/");
          const redirectTo = req.session.originalUrl || '/';
 
          res.redirect(redirectTo);
       } else {
          res.render('login', { message: 'Ο κωδικός πρόσβασης είναι λάθος' });
       }
    }
 };
 
 export let doLogout = (req, res) => {
    //Σημειώνουμε πως ο χρήστης δεν είναι πια συνδεδεμένος
    req.session.destroy();
    res.redirect('/');
 };
 
 //Τη χρησιμοποιούμε για να ανακατευθύνουμε στη σελίδα /login όλα τα αιτήματα από μη συνδεδεμένους χρήστες
 export let checkAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
       console.log('user is authenticated', req.originalUrl);
       //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
       next();
    } else {
       //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
       //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
       if (req.originalUrl === '/login' || req.originalUrl === '/register') {
          next();
       } else {
          //Στείλε το χρήστη στη "/login"
          console.log('not authenticated, redirecting to /login');
          res.redirect('/login');
       }
    }
 };
 