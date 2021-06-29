const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUser = (req, res, callback) => {
    if(req.payload && req.payload.email){
        User
            .findOne({email: req.payload.email})
            .exec((err,user) => {
                if(!user){
                    return res
                        .status(404)
                        .json({"message" : "User not found"})
                } else if(err){
                    console.log(err)
                    return res
                        .status(404)
                        .json(err)
                }
                callback(req, res, user.name)
            });
    }
    else{
        return res
            .status(404)
            .json({"message" : "User not found"});
    }
}

const register = (req, res) =>{
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save((err) => {
        if(err){
            res
                .status(404)
                .json(err)
        }
        else{
            const token = user.generateJwt();
            res
                .status(200)
                .json({token})
        }
    })    
};

const login = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res
            .status(400)
            .json({"message": "All fields are required"});
    }
    passport.authenticate('local', (err, user, info) =>{
        let token;
        if(err){
            return res
                .status(404)
                .json(err);
        }
        if(user){
            token = user.generateJwt();
            res
                .status(200)
                .json({token});
        }
        else{
            res
                .status(401)
                .json(info);
        }
    })(req,res);
};

module.exports = {
    register,
    login,
    getUser
}