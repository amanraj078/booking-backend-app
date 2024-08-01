const {
    CreateAdventureDetailInDbService,
} = require("../service/AdventureDetail.Service");

async function CreateAdventureDetailController(req, res) {
    try {
        const { id: AdventureId } = req.query;

        const { subtitle, description, slots } = req.body;
        //date utc format me nhi h, mongodb nhi lega isliye convert krke bhej rhe h
        const modifiedDateSlots = slots.map((elem) => {
            const [day, month, year] = elem.date.split("-").map(Number);

            const date = new Date(Date.UTC(year, month - 1, day));
            return {
                date,
                numberOfPerson: elem.numberOfPerson,
            };
        });
        const result = await CreateAdventureDetailInDbService(
            AdventureId,
            subtitle,
            description,
            modifiedDateSlots
        );

        if (result.success) {
            res.status(201).json({
                success: true,
                data: result.data,
            });
        } else {
            throw new Error(
                "createNewAdventureDetailInDbServiceController failed to complete task"
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

module.exports = {
    CreateAdventureDetailController,
};
