const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

router.post("/register", (req, res) => {
    let { name, email, password, role = "user" } = req.body;
    if (!name || !email || !password || !role)
        return res.status(400).send({ msg: "Veuillez fournir toutes les données requises" });

    User.findOne({ email: email }).then((user) => {
        if (user) {
            return res.status(400).send({ status: "emailexiste", msg: "l'email existe déjà" });
        }
        if (!user) {
            let newUser = new User({ name, email, password, role });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.status(500).send({ msg: "Erreur" });
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return res.status(500).send({ msg: "Erreur de hachage du mot de passe" });
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        jwt.sign(
                            { id: user.id },
                            config.get("jwtSecret"),
                            { expiresIn: config.get("tokenExpire") },
                            (err, token) => {
                                if (err) return res.status(500).send({ msg: "Erreur" });
                                res.status(200).json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                        role: user.role,
                                    },
                                });
                            }
                        );
                    }).catch(err => {
                        res.status(500).send({ msg: "Erreur lors de l'enregistrement de l'utilisateur dans la base de données" });
                    });
                });
            });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erreur lors de la recherche d'un utilisateur dans la base de données" });
    });
});

module.exports = router;
