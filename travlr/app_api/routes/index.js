const express = require("express");
const router = express.Router();
const {expressjwt: jwt} = require('express-jwt');


const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"],
  });

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

//route for loging in
router.route("/login")
    .post(authController.login);

//route for registering on the site
router.route("/register")
    .post(authController.register);

//route for adding trips via the SPA
router.route("/trips")
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

//route for updating and deleteing trips via the SPA
 router.route("/trips/:tripCode")
     .get(tripsController.tripsFindByCode)
     .delete(auth, tripsController.tripsDeleteTrip)
     .put(auth, tripsController.tripsUpdateTrip);

//router.route("/trips/:tripCode").get(tripsController.tripsFindByCode);

module.exports = router;