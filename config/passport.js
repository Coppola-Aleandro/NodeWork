const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require("../model/User");

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: "username"
    }, (username, password, done) => {
        //console.log(password);
        User.findOne({ username: username }).then(user => {
            if (!user) {
                return done(null, false, { message: "Utente non trovato" });
            }

            //VERIFICA PASSWORD
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {
                    return done(null, user, { message: "Login avvenuto" })
                } else {
                    return done(null, false, { message: "Password non corretta" })
                }
            });
        });
    }))

    passport.serializeUser(function (user, done) {        
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {        
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}