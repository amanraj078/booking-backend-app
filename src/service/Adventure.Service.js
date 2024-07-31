const AdventureModel = require("../model/Adventure.Model");

async function CreateNewAdventureInDbService(
    cityId,
    name,
    images,
    category,
    duration,
    pricePerHead
) {
    try {
        const result = await AdventureModel.create({
            cityId,
            name,
            images,
            category,
            duration,
            pricePerHead,
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

async function GetAllAdventureInDbService(cityId) {
    try {
        const result = await AdventureModel.find({
            cityId,
        });
        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            throw new error("Getalldbservice is unable to get adventures");
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "From db service",
        };
    }
}

async function UpdateAdventureInDbService(AdventureId, data) {
    try {
        const { name, images, category, duration, pricePerHead } = data;
        const AdventureDocument = await AdventureModel.findById(AdventureId);
        if (name) {
            AdventureDocument.name = name;
        }
        if (images) {
            AdventureDocument.images = images;
        }
        if (category) {
            AdventureDocument.category = category;
        }
        if (duration) {
            AdventureDocument.duration = duration;
        }
        if (pricePerHead) {
            AdventureDocument.pricePerHead = pricePerHead;
        }
        const result = await AdventureDocument.save();
        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            throw new Error(
                "updateAdventureInDbService is unable to update the adventure with given id",
                AdventureId
            );
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "From db service",
        };
    }
}

async function DeleteAdventureInDbService(AdventureId) {
    try {
        const result = await AdventureModel.findByIdAndDelete(AdventureId);

        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            return {
                success: false,
                message: "Adventure not found",
            };
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
        };
    }
}

async function SearchAdventureInDbService(AdventureId) {
    try {
        const result = await AdventureModel.findById(AdventureId);
        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            return {
                success: false,
                message: "This data don't exist",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}

module.exports = {
    CreateNewAdventureInDbService,
    GetAllAdventureInDbService,
    UpdateAdventureInDbService,
    DeleteAdventureInDbService,
    SearchAdventureInDbService,
};
