const { createNewUserInDbService } = require("../service/User.Service");
const bcrypt = require("bcrypt");

async function CreateNewUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(404).json({
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

module.exports = {
    CreateNewUserController,
};
