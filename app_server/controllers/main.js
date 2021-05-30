/* GET home page. */
const index = (req, res) => {
    res.render('index',{ title: 'Roqeeb'});
}

module.exports = {
    index
};