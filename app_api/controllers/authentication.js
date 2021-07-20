const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

// Error Handler
const errorHandler = (err) => {
    let errors = {email: '', password: ''}

    if(err.message == 'User with email already exists'){
        errors.email = 'User with email already exists';
    }

    if(err.message == 'user exists'){
        errors.password = 'User with email already exists';
    }

    if(err.message == 'Incorrect Password'){
        errors.password = 'Incorrect Password';
    }

    if(err.message == 'Incorrect email'){
        errors.email = 'Incorrect email';
    }

    if(err.message == 'All fields required'){
        errors.email = 'All fields required';
        errors.password = 'All fields required';
    }

    return errors;
}

// Check if email exists
const emailCheck = (email, callback) => {
    User.findOne({email: email})
        .exec((error, user) => {
            if(error){
                return callback(error);
            }
            callback(null,user);
        })
}

// SIgn up user
const register = (req, res) =>{
    if (!req.body.name || !req.body.email || !req.body.password) {
        const error = errorHandler({"message": "All fields required"});
        return res
            .status(400)
            .json({error});
    }
    emailCheck(req.body.email, function (error, user){
        if(error){
            return next(error);
        }

        if(user){            
            const error = errorHandler({"message":"User with email already exists"});
            res
                .status(401)
                .json({error});
        }
        else{
            const user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save((err) => {
                if(err){
                    const error = errorHandler(err);
                    res
                        .status(404)
                        .json({error});
                }
                else{
                    const token = user.generateJwt(user._id);
                    res.cookie('jwt', token, {httpOnly: true, maxAge: 24*60*60*1000});
                    res
                        .status(201)
                        .json({user: user._id, token})
                }
            });
        }
    });   
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
                .json({user: user._id, token});
        }
        else{
            const error = errorHandler(info);
            res
                .status(401)
                .json({error});
        }
    })(req,res);
};

const logout = (req, res) => {
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('/signup')
}

const forgot = (req, res) => {
    if(!req.body.email){
        return res
            .status(400)
            .json({"message":"Email field is required"});
    }
    emailCheck(req.body.email, function (error, user){
        if(error){
            return next(error);
        }

        if(user){ 
            var payload = user.email;
            var secret = user.hash + '-' + user.createdAt.getTime();
            
            var token = jwt.sign({
                _id: user._id,
                email: user.email,
                name: user.name,
                exp: Math.floor(Date.now() / 1000)+(60*60)
            }, secret);

            //Send link as email
            var link = '/resetpassword/'+payload+'/'+token;
            res
                .status(200)
                .json(link);
        }
        else{
            res
                .status(401)
                .json({"message":"Email does not exist"});
        }
    });
}


//Request forgot password
const reset = (req, res) => {
    email = req.params.email;
    emailCheck(email, function (error, user){
        if(error){
            return next(error);
        }

        if(user){
            const secret = user.hash + '-' + user.createdAt.getTime();
            const decoded = jwt.verify(req.params.token,secret);
            res.json(decoded);
        }
        else{
            res
                .status(401)
                .json({"message":"error"});
        }
    })
}

const resetPassword = (req, res) => {
    email = req.body.email;
    password = req.body.password;
    emailCheck(email, function(error, user){
        if(error){
            return next(error);
        }

        if(user){
            const secret = user.hash + '-' + user.createdAt.getTime();
            // const decoded = jwt.verify(req.body.token,secret); 
            jwt.verify(req.body.token,secret, async (err, decoded) => {
                if(err){
                    res
                        .status(404)
                        .json(err)
                }

                if(decoded){
                    User
                    .findById(decoded._id)
                    .exec((err, ret) => {
                        ret.setPassword(password);
                        ret.save((err, reset) => {
                            if(err){
                                res
                                    .status(404)
                                    .json(err);
                            }
                            else{
                                res
                                    .status(200)
                                    .json(reset);
                            }
                        });
                    });
                }
            });            
        }
    });
}

module.exports = {
    register,
    login,
    logout,
    forgot,
    reset,
    resetPassword
}