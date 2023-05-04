const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const workersController=require('../controllers/worker');

router.get('/new',passport.checkAuthentication,workersController.new);
router.post('/new',passport.checkAuthentication,workersController.createNew);
router.get('/show',passport.checkAuthentication,workersController.show);
router.get('/delete/:id',passport.checkAuthentication,workersController.delete);
router.get('/update/:id',passport.checkAuthentication,workersController.showUpdate)
router.post('/update/:id',passport.checkAuthentication,workersController.update)

module.exports=router;