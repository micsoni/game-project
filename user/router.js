const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");
const { toJWT, toData } = require("../auth/jwt");
const router = express.Router();

router.post("/user", async (req, res, next) => {
  try {
    const userCredentials = {
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    if (!userCredentials.email || !userCredentials.password) {
      res.status(400).send({
        message: "Please supply a valid email and password"
      });
    } else {
      const createUser = await User.create(userCredentials); //res.send(createUser);

      res.send({
        jwt: toJWT({ userId: userCredentials.id })
        // id: userFound.id
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
