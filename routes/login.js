var express = require('express');
var router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
    const message = req.session.message;
    const error = req.session.error;

    res.render('login', {
        title: 'Login page',
        message: message,
        error: error,
        session: req.session
    });
});

router.post('/', async function(req, res, next) {
    const { user: username, pass: password } = req.body;

    const db = database;
    const isValidLogin = await db.users.authenticateUser(username, password);
    console.log("Username: ", username)
    console.log("Pass: ", password)

    if (isValidLogin) {
        const user = db.users.data[username];
        const currentDate = new Date().toISOString();

        db.users.data[username].last_login = currentDate;
        req.session.user = {
            username: user.username,
            role: user.role,
            last_login: currentDate
        }

        console.log("Session: ", req.session.user);
        // res.cookie('user', username);
        // res.cookie('last_login', new Date().toISOString());
        req.session.message = "Login succesful";
        res.redirect(user.role === 'admin' ? '/admin' : '/');
    } else {
        req.session.error = "Invalid credentials. Please try again";
        res.redirect("/login");
    }
    // console.log("Session data: ", req.cookies);
})


module.exports = router;