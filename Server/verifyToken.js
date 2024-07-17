const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
 
    if (!token) {
        return res.status(401).json({ error: "You're not authenticated!" });
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: err.message });
        }

        req.user = user;
        next();
    });
}

module.exports = { verifyToken };
