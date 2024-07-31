const UserModel = require("../model/User.Model");

async function createNewUserInDbService(name, email, password) {
    try {
        const result = await UserModel.create({
            name,
            email,
            password,
        });
        if (result) {
            return {
                success: true,
                data: result,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}

module.exports = { createNewUserInDbService };
