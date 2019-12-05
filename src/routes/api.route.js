

const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const usuarioRouter = require("./api.usuario.route");
router.use("/Usuario", usuarioRouter);

router.post("/login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    /*
    Validación de los parametros
    */
    if (!username || !password) {
        res.status(400).json({
            message: "Invalid body params",
            'reponse' : req.body

        })
        return
    }

    /**
     * Funcion para encontrar el usuario, regresa 404 si no existe
     * Regresa 500 si error en el servidor
     * Regresa 200 con el token del usuario si todo es correcto.
     */
    Usuario.findOne({
        username: username,
        password: password
    }, function (err, doc) {
        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            })
            console.error(err)
            return
        }
        if (doc) {
            var tokenPayload = {
                _id: doc._id,
                username: doc.username
            }

            var token = jwt.sign(tokenPayload, config.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24 * 365 // Expira en una semana
            })

            res.json({
                token: token
            })

        } else {
            res.status(401).json({
                message: "Username not found"
            });
        }
    })

});

module.exports = router;





