var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.session.destroy((err) => {
        if (err) {
        console.error('Error destroying session:', err);
        return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
