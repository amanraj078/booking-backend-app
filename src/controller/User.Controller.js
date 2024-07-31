const { createNewUserInDbService } = require("../service/User.Service");

async function CreateNewUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        const result = await createNewUserInDbService(name, email, password);

        if (!result.success) {
            throw new Error("createNewUserInDbService failed to complete task");
        }
        // console.log(req.body);
        res.status(201).json({
            success: true,
            data: result.data,
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
