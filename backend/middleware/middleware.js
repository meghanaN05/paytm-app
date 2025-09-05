const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

function authMiddleware(req, res, next)  {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ msg: "No token,authorization denied" })
    }
    const token = authHeader.split(" ")[1]      
    if (!token) {
        return res.status(401).json({ msg: "No token,authorization denied" })
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.email = decoded.email
        req.id = decoded.id

        next()
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}

module.exports = {authMiddleware}
