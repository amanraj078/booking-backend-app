const {
    createNewUserInDbService,
    getUserByEmailFromDbService,
} = require("../service/User.Service");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwt_secret_key = process.env.JWT_SECRET_KEY;
async function CreateNewUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "email, name or password is required",
            });
            return;
        }

        const SALT = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, SALT);

        const result = await createNewUserInDbService(
            name,
            email,
            encryptedPassword
        );

        if (!result.success) {
            throw new Error("createNewUserInDbService failed to complete task");
        }
        // console.log(req.body);
        res.status(201).json({
            success: true,
            message: "user registered successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

async function SigninUserController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const err = new Error("email and password are required");
            err.status = 400;
            throw err;
        }

        //step1: we have to verify the email and password
        const userResult = await getUserByEmailFromDbService(email);

        if (!userResult.success) {
            const err = new Error("Invalid Credentials");
            err.status = 400;
            throw err;
        }

        //checking password
        const { password: encryptedPassword, _id: userId } = userResult.data;

        const passwordCompareResult = bcrypt.compareSync(
            password,
            encryptedPassword
        );

        if (!passwordCompareResult) {
            const err = new Error("Invalid email or password");
            err.status = 400;
            throw err;
        }

        //step2: we will generate the token and send back to the user
        const PAYLOAD = {
            userId: userId,
        };

        const token = jwt.sign(PAYLOAD, jwt_secret_key, {
            expiresIn: "1h",
        });

        res.status(201).json({
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(error.status ? error.status : 500).json({
            success: false,
            message: error.status ? error.status : "something went wrong",
        });
    }
}

module.exports = {
    CreateNewUserController,
    SigninUserController,
};
