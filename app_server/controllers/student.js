const students = (req, res) => {
    res.render('pages/student/index',{
        title: 'Students',
        data: {
            name: 'John Ducky',
            type: 'Administrator'
        }
    });
}

module.exports = {
    students
}