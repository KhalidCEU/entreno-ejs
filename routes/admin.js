var express = require('express');
var router = express.Router();
const database = require('../database');

/* GET admin page. */
router.get('/', async function(req, res, next) {
    try {
        const users = await database.users.data;
        const message = req.session.message;
        delete req.session.message;

        // console.log("Users: ", users);
        res.render('admin', {
            title: 'Admin Panel',
            users: users,
            message: message,
            session: req.session
        });
    } catch(error) {
        console.error('Error loading admin page: ', error);
    }
});

router.post('/deleteUser', async function(req, res, next) {
    try {
        const username = req.body.username;
        console.log("Username: ", username);
        if (database.users.data[username]) {
            delete database.users.data[username];
            req.session.message = `User ${username} deleted successfully !`;
        } else {
            req.session.message = `User ${username} not found !`;
        }

        res.redirect("/admin");
    } catch(error) {
        console.error('Error deleting user: ', error);
        req.session.message = `Error deleting user ${username}`;
        res.redirect("/admin");
    }
});


module.exports = router;
