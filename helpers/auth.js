const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
    try {
        let authToken = req.headers.authorization
        if (!authToken || !authToken.startsWith("Bearer")) {
            throw new Error("Token Required")
        }
        let token = authToken.split(" ")[1];
        let decode = jwt.verify(token, "123");
        req.user = { role: decode.role,email: decode.name }
        
        next()
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
}

module.exports = auth