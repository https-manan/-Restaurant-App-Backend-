const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing"
            });
        }

        const token = authHeader.split(" ")[1]; 

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized access"
                });
            }
            req.user = decode; 
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Auth API"
        });
    }
};
