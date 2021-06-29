const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

if(process.env.NODE_ENV === 'production')
{
    apiOptions.server = 'http://welcomebackroq.herokuapp.com'; 
}
const login = (req,res) => {
    res.render('auth/login', {title: 'Login'});
}

const register = (req, res) => {
    res.render('auth/register', {title: 'Register'});
}

module.exports = {
    login,
    register
}