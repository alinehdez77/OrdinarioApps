

const express = require('express');
const router = express.Router();
const Usuario = require("../dataaccess/model/Usuario");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const usuarioRouter = require("./api.usuario.route");
router.use("/Usuario", usuarioRouter);



module.exports = router;





