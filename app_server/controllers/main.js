/* GET home page. */
const index = (req, res) => {
    res.render('index',{ 
        title: 'Dashboard',
        data: {
            name: 'John Ducky',
            type: 'Administrator'
        }
    });
}

module.exports = {
    index
};