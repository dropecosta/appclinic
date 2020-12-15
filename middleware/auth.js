const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // check if not token
    if (!token) {
        return res.status(401).json({ msg: 'Não existe token, autorização negada.' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token não é válido.' });
    }

}