const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const recruitersController=require('../controllers/recruiter');

router.get('/new',passport.checkAuthentication,recruitersController.new);
router.post('/new',passport.checkAuthentication,recruitersController.createNew);
router.get('/show',passport.checkAuthentication,recruitersController.show);
router.get('/delete/:id',passport.checkAuthentication,recruitersController.delete);
router.get('/update/:id',passport.checkAuthentication,recruitersController.showUpdate)
router.post('/update/:id',passport.checkAuthentication,recruitersController.update)

module.exports=router;