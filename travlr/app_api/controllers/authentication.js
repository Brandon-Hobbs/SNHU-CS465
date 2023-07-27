const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model('user');

//method used to test the API GET endpoint
//TO DO; Delete me
// const test = (req, res) => {
//     console.log(">>authenticationTest in API");
//     return res.status(200);
// };

const register = (req, res) => {
    console.log(">>authenticationRegister in API");
    if (!req.body.name || !req.body.email || !req.body.password) {
        console.log(req.body);
        return res.status(400).json({ message: "All fields required" });
  }
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      const token = user.generateJwt();
      res.status(200).json({ token });
    }
  });
};

const login = (req, res) => {
    console.log(">>authenticationLogin in API");
    if (!req.body.email || !req.body.password) {
        console.log(req.body);
        return res.status(400).json({ message: "All fields required" });
    }
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(404).json(err);
        }

        if (user) {
            const token = user.generateJwt();
            res.status(200).json({ token });
        } 
        else {
            res.status(401).json(info);
        }
  })(req, res);
};

module.exports = {
  register,
  login,
};