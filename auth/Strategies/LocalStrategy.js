
var passport = require("passport"); 
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var lodash = require("lodash");

var User = require("../../models/User");


var localStrategy = passport.use(new LocalStrategy(
    function (username, password, done) {

        User.findOne({
            where: {
                email: username,
            }
        })
            .then(user => {
                if (!user) {
                    return done(null, false);
                }
                else {
                    bcrypt.compare(password, user.passwordHash, function (err, result) {
                        if (result == false) {
                            return done(null, { status : false })
                        }
                        else {
                            return done(null, {status : true} , lodash.pick(user, ['uuid', 'firstname', 'surname', 'email']))
                        }
                    })
                }

            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = localStrategy.Strategy;