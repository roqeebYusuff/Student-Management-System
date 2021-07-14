const request = require('request');

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

/* GET home page. */
const indexRender = (req, res, responseBody) => {
    let message = null;
    // console.log(`The body is ${responseBody}`);
    console.log(responseBody)
    if(!responseBody.length) {
        message = 'No user found';
    }
    res.render('pages/dashboard/index',{ 
        title: 'Dashboard',
        data: responseBody,
        message
    });
}

const index = (req, res) => {
    //Use id to check for existence
    const path = `/api/auth/60cf79ded629054a4c1db253`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},

    };
    request(requestOptions, (err, {statusCode}, body) =>{
        if(statusCode === 200){
            indexRender(req, res, body);
        }
        else{
            showError(req,res,statusCode);
        }
    });
}

module.exports = {
    index
};