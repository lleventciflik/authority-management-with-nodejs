
var passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var config = require("../jwtConfig");

var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};

var opts = {};
opts.jwtFromRequest = cookieExtractor; // check token in cookie
opts.secretOrKey = config.jwt.secret;

var jwtStrategy = passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);

    return  User.findOne({
        where: {
            uuid: jwt_payload.sub
        }
    })
        .then(user => {
            if (user) {
                return done(null,user);
            } else {
                return done(null,false);
            }
        })
        .catch(err => {
            res.send("error :" + err)
        })
}));

module.exports = jwtStrategy.Strategy;
