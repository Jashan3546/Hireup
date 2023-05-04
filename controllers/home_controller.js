const user = require('../models/users')

module.exports.home = async (req, res) => {
    

    try {
        
        let users = await user.find({});
        return res.render("home", { all_users: users })

    } catch (error) {
        console.log('error occured in homecontroller', error);
        return;
    }

}