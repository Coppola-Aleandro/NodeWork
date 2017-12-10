const passport = require('passport');
module.exports = {

    ensureAuthenticated: function (req, res, next) {       
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("msg_error", "Utente non loggato");
        res.redirect("/login");
    }

}