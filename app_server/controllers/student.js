const allstudents = (req, res) => {
    res.render('pages/student/allStudents/index',{
        title: 'Students | All Students',
        category: 'Students',
        submenu: 'AllStudents',
        data: {
            name: 'John Ducky',
            type: 'Administrator'
        }
    });
}

const addstudent = (req, res) => {
    res.render('pages/student/addStudents/index',{
        title: 'Students | Add Student',
        category: 'Students',
        submenu: 'AddStudent',
        data: {
            name: 'John Ducky',
            type: 'Administrator'
        }
    });
}

module.exports = {
    allstudents,
    addstudent
}