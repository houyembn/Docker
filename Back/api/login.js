const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");
const User = require("../Models/user");

// @route GET api/login
// @desc Login user
// @access Public
router.post("/login-user", (req, res) => {
  let { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ msg: "Veuillez saisir toutes les données | body : "+JSON.stringify(req.body) });

  User.findOne({ email: email }).then((user) => {
    if (!user)
    return res.status(400).send({ status:"usernotok",msg: "L'utilisateur n'existe pas" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).send({ status:"passnotok",msg: "Mot de passe incorrect" });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: config.get("tokenExpire") },
        (err, token) => {
          if (err) throw err;

          console.log({
            status: "ok",
            msg: "ok",
            data: token,
            user: {
              name: user.name,
              role: user.role,
            },
          });

          return res.status(200).send({
            status: "ok",
            msg: "ok",
            data: token,
            user: {
              name: user.name,
              role: user.role,
            },
          });
        }
      );
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la recherche utilisateur:", error);
    return res.status(500).send({ status: "serverError", msg: "Erreur interne du serveur" });
  });
});

module.exports = router;

