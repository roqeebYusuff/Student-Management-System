const request = require('request');
var mailer = require('../../helpers/mailer');
const { email } = require('../../helpers/mail');
const { transporter } = require('../../helpers/mail');
const apiOptions = {
    server: 'http://localhost:3000'
}

if(process.env.NODE_ENV === 'production')
{
    apiOptions.server = 'http://welcomebackroq.herokuapp.com'; 
}

/* Error Page */
const showError = (req, res, status) => {
    let title = '';
    let content = ''
    if(status == 404){
        title = '404, page not found';
        content = 'Oh dear, looks like you can\'t find this page. Sorry.';
    }
    else{
        title = `${status}, something's gone wrong`;
        content = 'Something, somewhere, has gone a little bit wrong';
    }
    res.status(status);
    res.render('something', {
        title,
        content
    });
}

const login = (req,res) => {
    res.render('auth/login', {title: 'Login'});
}

const loginPost = (req, res) => {
    const path = '/api/login';
    const postData = {
        email: req.body.email,
        password: req.body.password,
    }
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData
    }

    if(!postData.email || !postData.password){
        res.json({"message":"All fields required"});
    }
    else{
        request(requestOptions, (err, {statusCode}, body)=> {
            if(statusCode === 200){
                const token = body.token;
                res.cookie('jwt', token, {httpOnly: true, maxAge: 24*60*60*1000});
                res.json(body);
            }

            else if(statusCode === 401 || statusCode === 400 || statusCode === 404){
                res.json(body);
            }
            else{
                showError(req, res, statusCode);
            }
        });
    }
}
//Register
const register = (req, res) => {
    res.render('auth/register', {title: 'Register'});
}

const registerPost = (req, res) => {
    const path = '/api/register';
    const postData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData
    };
    
    if(!postData.name || !postData.email || !postData.password){
        res.json({"message": "All fields required"});
    }
    else{
        request(requestOptions, (err, {statusCode}, body) =>{
            if(statusCode === 201){
                const token = body.token;
                res.cookie('jwt', token, {httpOnly: true, maxAge: 24*60*60*1000});
                res.json(body);
            }

            else if(statusCode === 401 || statusCode=== 400) {
                // res.redirect('');
                res.json(body);
            }

            else{
                showError(req, res, statusCode);
            }
        })
    }
}

//Logout
const logout = (req,res) => {
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('/login');
}

//Forgot Password
const forgot = (req,res) => {
    res.render('auth/forgotpassword', {title: 'Forgot Password'});
}

const forgotPost = (req, res)=> {
    const path = '/api/forgotpassword';
    const postData = {
        email: req.body.email
    }
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData
    }

    if(!req.body.email){
        res.json({"message":"Email field is required"});
    }
    else{
        request(requestOptions, (err, {statusCode}, body) =>{
            console.log(`Status: ${statusCode}`);
            console.log(`Error: ${err}`);
            console.log(`Body: ${body}`);
            if(statusCode == 200)
            {
                res.json(body);

                //Send Email
            }
            else if(statusCode === 404 || statusCode === 401){
                res.json(body);
            }
            else{
                showError(req,res,statusCode);
            }
        });
    }
}

const template = (req, res) => {
    // var locals = { name: "New User", siteName: "Codemoto" };
    // mailer.sendMail('no-reply@codemoto.io', 'gibsonroq@gmail.com', 'Welcome!', 'signup', locals).then(function () {
    //     res.status(200).send('A welcome email has been sent to gibsonroq@gmail.com.');
    // }, function (err) {
    //     if (err) { return res.status(500).send({ msg: err.message }); }
    // });
    // var mailOptions = {
    //     from: '"Mazer Team" <from@example.com>',
    //     to: 'gibsonroq@gmail.com',
    //     subject: 'Nice Nodemailer test',
    //     text: 'Hey there, it’s our first message sent with Nodemailer ',
    //     html: 'We heard that you lost your password. Sorry about that! But don\'t worry! You can use the button below to reset your password',
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    // });

    email.send({
        template: 'forgot',
        message: {
          to: 'gibsonroq@gmail.com'
        },
        locals: {
          name: 'Elon',
          link: 'just/a/test/link'
        }
    })
    .then(console.log)
    .catch(console.error);
}

module.exports = {
    login,
    register,
    registerPost,
    logout,
    loginPost,
    forgot, 
    forgotPost,
    template
}