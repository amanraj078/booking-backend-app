const CityModel = require("./../model/City.Model");

async function createNewCityInDbService(name, image, description, cuisines) {
    try {
        const result = await CityModel.create({
            name,
            image,
            description,
            cuisines,
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

async function getAllCityInDbService() {
    try {
        const result = await CityModel.find();

        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            throw new error("Getalldbservice is unable to get cities");
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "From db service",
        };
    }
}

async function updateCityInDbService(CityId, data) {
    try {
        const { name, image, description, cuisines } = data;
        const cityDocument = await CityModel.findById(CityId);
        if (name) {
            cityDocument.name = name;
        }
        if (image) {
            cityDocument.image = image;
        }
        if (description) {
            cityDocument.description = description;
        }
        if (cuisines) {
            cityDocument.cuisines = cuisines;
        }
        const result = await cityDocument.save();

        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            throw new Error(
                "updateCityInDbService is unabel to update the city with given id",
                CityId
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

async function deleteCityInDbService(cityId) {
    try {
        const result = await CityModel.findByIdAndDelete(cityId);

        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            return {
                success: false,
                message: "City not found",
            };
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
        };
    }
}

module.exports = {
    createNewCityInDbService,
    getAllCityInDbService,
    updateCityInDbService,
    deleteCityInDbService,
};
