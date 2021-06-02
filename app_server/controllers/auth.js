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