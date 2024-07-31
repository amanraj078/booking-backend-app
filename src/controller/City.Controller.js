const {
    createNewCityInDbService,
    getAllCityInDbService,
    updateCityInDbService,
    deleteCityInDbService,
} = require("../service/City.Service");

async function CreateNewCityController(req, res) {
    try {
        const { name, image, description, cuisines } = req.body;
        const result = await createNewCityInDbService(
            name,
            image,
            description,
            cuisines
        );

        if (!result.success) {
            throw new Error("createNewCityInDbService failed to complete task");
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

async function GetAllTheCitiesController(req, res) {
    try {
        const result = await getAllCityInDbService();
        if (result.success) {
            const DATA = result.data.map((elem) => {
                const { _id, name, image, description, cuisines } = elem;
                return { id: _id, name, image, description, cuisines };
            });

            res.status(201).json({
                success: true,
                data: DATA,
            });
        } else {
            throw new Error("ControllerInDbService failed to complete task");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

async function UpdateCityController(req, res) {
    try {
        const { id: cityId } = req.query;
        const { name, image, description, cuisines } = req.body;
        const DATA = {};

        if (name) {
            DATA.name = name;
        }
        if (image) {
            DATA.image = image;
        }
        if (description) {
            DATA.description = description;
        }
        if (cuisines) {
            DATA.cuisines = cuisines;
        }

        const result = await updateCityInDbService(cityId, DATA);

        if (result.success) {
            res.status(200).json({ success: true, data: result.data });
        } else {
            throw new Error(
                "ControllerUpdateInDbService failed to complete task"
            );
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

async function DeleteCityController(req, res) {
    try {
        const { id: cityId } = req.query;

        const result = await deleteCityInDbService(cityId);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: "City deleted successfully",
            });
        } else {
            throw new Error("DeleteCityInDbService failed to complete task");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
}

module.exports = {
    CreateNewCityController,
    GetAllTheCitiesController,
    UpdateCityController,
    DeleteCityController,
};
