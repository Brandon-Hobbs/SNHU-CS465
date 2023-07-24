const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

//route for adding
router.route("/trips")
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

//route for updating and deleteing
 router.route("/trips/:tripCode")
     .get(tripsController.tripsFindByCode)
     .delete(tripsController.tripsDeleteTrip)
     .put(tripsController.tripsUpdateTrip);

//router.route("/trips/:tripCode").get(tripsController.tripsFindByCode);

module.exports = router;