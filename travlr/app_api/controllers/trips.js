const mongoose = require('mongoose');
const Model = mongoose.model('trips');

//get trips - list all trips
const tripsList = async(req, res) => {
    Model
        .find({})
        .exec((err, trips) => {
            if (!trips){
                return res
                    .status(404)
                    .json({"message": "trips not found"});
            }
            else if (err){
                return res
                    .status(404)
                    .json(err);
            }
            else{
                return res
                    .status(200)
                    .json(trips);
            }
        }); 
};

//get trips by code
const tripsFindByCode = async (req, res) => {
  console.log(">>tripsFindByCode in API");
  console.log(req.body);
    Model
        .find({code: req.params.tripCode})
        .exec((err, trip) => {
            if (!trip){
                return res
                    .status(404)
                    .json({"message": "trips not found"});
            }
            else if (err){
                return res
                    .status(404)
                    .json(err);
            }
            else{
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

//add the trip from the POST command
const tripsAddTrip = async (req, res) => {
  console.log(">>tripsAddTrip in API");
  console.log(req.body);
  
    Model.create(
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
        },
        (err, trip) => {
            if (err) {
                return res
                    .status(400) //bad request
                    .json(err);
            } 
            else {
                return res
                    .status(201) //creates
                    .json(trip);
            }
        }
    );
  };

//method to update the trips in the DB
const tripsUpdateTrip = async (req, res) => {
  console.log(">>tripsUpdateTrip in API");
  console.log(req.body);
  
  Model.findOneAndUpdate(
    { code: req.params.tripCode },
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    },
    { new: true }
  )
    .then((trip) => {
      if (!trip) {
        return res.status(404).send({
          message: "Trip not found with code " + req.params.tripCode,
        });
      }
      res.send(trip);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Trip not found with code " + req.params.tripCode,
        });
      }
      return res
        .status(500) // server error
        .json(err);
    });
}

//delete trips by ID
const tripsDeleteTrip = async (req, res) => {
  console.log(">>tripsDeleteTrip in API");

  Model.findOneAndDelete(
    { code: req.params.tripCode })

    .then((trip) => {
      if (!trip) {
        return res.status(404).send({
          message: "Trip not found with code " + req.params.tripCode,
        });
      }
      res.send(trip);
    })

    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Trip not found with code " + req.params.tripCode,
        });
      }
      return res
        .status(500) // server error
        .json(err);
      });
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
};