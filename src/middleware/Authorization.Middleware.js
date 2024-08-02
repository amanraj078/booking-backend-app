const jwt = require("jsonwebtoken");
const { getUserByUserIdFromDbService } = require("../service/User.Service");
require("dotenv").config();

const jwt_secret_key = process.env.JWT_SECRET_KEY;

async function AdminAuthorizationMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const payload = jwt.verify(token, jwt_secret_key);

        const { userId: userId } = payload;

        const result = await getUserByUserIdFromDbService(userId);

        if (!result.success) {
            throw new Error();
        }

        const { role } = result.data;

        if (role == "admin") {
            next();
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        res.status(error.status ? error.status : 500).json({
            success: false,
            message: error.status ? error.message : "Something went wrong",
        });
    }
}

module.exports = {
    AdminAuthorizationMiddleware,
};
