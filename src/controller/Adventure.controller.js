const {
    CreateNewAdventureInDbService,
    GetAllAdventureInDbService,
    UpdateAdventureInDbService,
    DeleteAdventureInDbService,
    SearchAdventureInDbService,
} = require("../service/Adventure.Service");

async function CreateNewAdventureController(req, res) {
    try {
        const { id: cityId } = req.query;
        const { name, images, category, duration, pricePerHead } = req.body;
        const result = await CreateNewAdventureInDbService(
            cityId,
            name,
            images,
            category,
            duration,
            pricePerHead
        );

        if (!result.success) {
            throw new Error(
                "createNewAdventureInDbService failed to complete task"
            );
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

async function GetAllAdventureController(req, res) {
    try {
        const { id: cityId } = req.query;
        const result = await GetAllAdventureInDbService(cityId);
        if (result.success) {
            const DATA = result.data.map((elem) => {
                const { _id, name, images, category, duration, pricePerHead } =
                    elem;
                return {
                    id: _id,
                    name,
                    images,
                    category,
                    duration,
                    pricePerHead,
                };
            });
            res.status(200).json({
                success: true,
                data: DATA,
            });
        } else {
            throw new Error(
                "ControllerGetAdventureInDbService failed to complete task"
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

async function UpdateAdventureController(req, res) {
    try {
        const { id: AdventureId } = req.query;
        const { name, images, category, duration, pricePerHead } = req.body;
        const DATA = {};

        if (name) {
            DATA.name = name;
        }
        if (images) {
            DATA.images = images;
        }
        if (category) {
            DATA.category = category;
        }
        if (duration) {
            DATA.duration = duration;
        }
        if (pricePerHead) {
            DATA.pricePerHead = pricePerHead;
        }

        const result = await UpdateAdventureInDbService(AdventureId, DATA);

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

async function DeleteAdventureController(req, res) {
    try {
        const { id: cityId } = req.query;
        const result = await DeleteAdventureInDbService(cityId);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: "Adventure deleted successfully",
            });
        } else {
            throw new Error(
                "DeleteAdventureInDbService failed to complete task"
            );
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
}

async function SearchAdventureController(req, res) {
    try {
        const { id: AdventureId } = req.query;
        const result = await SearchAdventureInDbService(AdventureId);
        if (result.success) {
            const { _id, name, images, category, duration, pricePerHead } =
                result.data;
            const DATA = {
                id: _id,
                name,
                images,
                category,
                duration,
                pricePerHead,
            };
            res.status(200).json({
                success: true,
                data: DATA,
            });
        } else {
            throw new Error(
                "SearchAdventureInDbService failed to complete task"
            );
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
    CreateNewAdventureController,
    GetAllAdventureController,
    UpdateAdventureController,
    DeleteAdventureController,
    SearchAdventureController,
};
