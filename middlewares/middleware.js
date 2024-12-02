

const middleware = {
    isAdmin: function(req, res, next) {
        if (req.session.user && req.session.user.role == 'admin') {
            next();
        } else {
            req.session.message = "You should be admin to access this route";
            res.redirect("/login");
        }
    },

    isLoggedIn: function(req, res, next) {
        if(req.session && req.session.user) {
            next();
        } else {
            console.log("Redirecting to login");
            res.redirect("/login");
        }
    }
}


module.exports = middleware;
