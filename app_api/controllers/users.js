const { json } = require('express');
const mongoose = require('mongoose');
const use = mongoose.model('User');

// const userCreate = (req, res) =>{

// }

const user = (req, res) =>{
    use
        .find()
        .exec((err,user) =>{
            if(err)
            {
                return res
                    .status(400)
                    .json(err)
            }
            res
                .status(200)
                .json(user)
        });
};

const createUser = (req, res)=>{
    use
        .create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            is_admin: req.body.is_admin
        }, (err, user) => {
            if(err)
            {
                return res
                    .status(400)
                    .json(err)
            }

            else if(user)
            {
                return res
                    .status(201)
                    .json(user);
            }
        });
}

const readOne = (req, res) => {
    use
        .findById(req.params.id)
        .exec((err,user) =>{
            if(!user)
            {
                return res
                    .status(404)
                    .json({"message":"user not found"});
            }
            else if(err){
                return res
                    .status(404)
                    .json(err)
            }
            res
                .status(200)
                .json(user);
        });
}

const deleteOne = (req,res) => {
    const userId = req.params.id;
    if (userId)
    {
        use
            .findByIdAndRemove(userId)
            .exec((err, user) => {
                if(err)
                {
                    res
                        .status(404)
                        .json(err);
                }
                else{
                    res
                        .status(204)
                        .json({"message":"User successfully deleted"})
                }
            });
    }
    else{
        res
            .status(404)
            .json({"message":"No User"});
    }
}

module.exports = {
    user,
    readOne,
    deleteOne,
    createUser
}