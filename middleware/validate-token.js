const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({error: "Acces Denied"});
    }

    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next()
    } catch (e) {
        return res.status(400).send({error: "Invalid Token"});
    }
}

module.exports = verifyToken;