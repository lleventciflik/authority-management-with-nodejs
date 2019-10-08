var express = require("express");
var router = express.Router();
var passport = require("passport");
var bcrypt = require("bcrypt");
var config = require("../auth/jwtConfig");
const uuid = require('uuid/v1');
var jwt = require('jsonwebtoken');

var jwtStrategy = require("../auth/Strategies/JWTStrategy");
var localStrategy = require("../auth/Strategies/LocalStrategy");
var JwtCookieComboStrategy = require('passport-jwt-cookiecombo');

var User = require("../models/User");

const BCRYPT_SALT_ROUNDS = 10;

passport.use(new JwtCookieComboStrategy({
    secretOrPublicKey: 'StRoNGs3crE7'
}, (payload, done) => {
    return done(null, payload.user);
}));


router.post('/login', passport.authenticate('local', {
    session: false
}), (req, res) => {
    
    var statusVerify = req.user;


    if(statusVerify.status)
    {
        var claims = {
            sub: req.authInfo.uuid,
            email: req.authInfo.email,
            permissions: req.authInfo.userRol
        };

        var token = jwt.sign(claims, config.jwt.secret, {
            expiresIn: 600 // in seconds
        });

        res.cookie('jwt', token); // add cookie here

        res.json({ success: true, token: 'JWT ' + token });

        res.status(200).send("authorized");
    }else{
        res.status(401).send("unauthorized");
    }
});


router.post("/register", (req, res) => {

    var pass = req.body.password;
    var salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
    var hashPass = bcrypt.hashSync(pass, salt);

    const data = {
        uuid: uuid(),
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        passwordHash: hashPass
    };

    User.create(data)
        .then(() => {
            res.status(200).send({ message: "user created" });
        });
});


module.exports = router;