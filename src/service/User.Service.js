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

async function getUserByEmailFromDbService(email) {
    try {
        const result = await UserModel.find({
            email,
        });

        if (result.length) {
            return {
                success: true,
                data: result[0],
            };
        } else {
            throw new Error(
                "getUserByEmailFromDbService unable to find the user"
            );
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}

async function getUserByUserIdFromDbService(userId) {
    try {
        const result = await UserModel.findById(userId);

        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            throw new Error(
                "getUserByUserIdFromDbService unable to find the user"
            );
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}

module.exports = {
    createNewUserInDbService,
    getUserByEmailFromDbService,
    getUserByUserIdFromDbService,
};
