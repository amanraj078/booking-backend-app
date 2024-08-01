const AdventureDetailsModel = require("../model/AdventureDetails.Model");

async function CreateAdventureDetailInDbService(
    AdventureId,
    subtitle,
    description,
    slots
) {
    try {
        console.log(AdventureId, subtitle, description, slots);
        const result = await AdventureDetailsModel.create({
            AdventureId,
            subtitle,
            description,
            slots,
        });
        if (result) {
            return {
                success: true,
                data: result,
            };
        } else {
            throw new Error(
                "CreateAdventureDetailInDbService is unable to create adventure detail"
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
    CreateAdventureDetailInDbService,
};
