const UserModel = require("../model/User.Model");

async function createNewUserInDbService(name, email, encryptedPassword) {
    try {
        const result = await UserModel.create({
            name,
            email,
            password: encryptedPassword,
        });
        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            throw new Error("createNewUserInDbService unable to create user");
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}

module.exports = { createNewUserInDbService };
