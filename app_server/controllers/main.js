/* GET home page. */
const index = (req, res) => {
    res.render('pages/dashboard/index',{ 
        title: 'Dashboard',
        data: {
            name: 'Phillip Wayne',
            type: 'Administrator'
        }
    });
}

module.exports = {
    index
};