const { log } = require("console");
const { rawListeners } = require("../models/users");
const users = require("../models/users")
//const fs = require('fs');
const path = require('path')

module.exports.users = async (req, res) => {
    try {
        let user = await users.findById(req.params.id)
        res.render("user_profile", { profile_user: user })
    } catch (error) {
        console.log('error in user route', error);
    }
}

module.exports.signup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile")
    }
    return res.render("signup")
}

module.exports.signin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile")
    }
    return res.render("signin")
}

module.exports.update = async (req, res) => {
    try {
        if (req.user.id == req.params.id) {
            await users.findByIdAndUpdate(req.params.id, req.body)
            req.flash('success', 'Profile updated')
            return res.redirect('back');
        }
        else {
            return res.status(401).send('UnAuthorised');
        }
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');

    }

}

module.exports.create = async (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            req.flash('error', 'Password and Comfirmpassword must be same')

            return res.redirect("back");
        }
        let user = await users.findOne({ email: req.body.email });
        if (!user) {
            users.create(req.body);
            req.flash('success', 'User created successfully')

            return res.redirect("/users/signin");
        }
        else {
            req.flash('error', 'Email already in use')

            return res.redirect("back")
        }
    } catch (error) {
        req.flash('error', error);
        return res.redirect("back")

    }
}

module.exports.createSession = (req, res) => {
    req.flash('success', 'logged in successfully');
    return res.redirect("/")
}

module.exports.destroySessin = (req, res) => {
    req.logout();
    req.flash('success', 'logged out successfully');
    return res.redirect('/')
}