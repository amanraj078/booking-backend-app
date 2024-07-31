const http = require("http");
const url = require("url");
const PORT = 4000;

var database = [
    {
        id: 1,
        name: "Bhilai",
        adventure: 0,
    },
    {
        id: 2,
        name: "raipur",
        adventure: 3,
    },
    {
        id: 3,
        name: "Bilaspur",
        adventure: 6,
    },
];
const serverHandler = (req, res) => {
    const { url: reqUrl, method } = req;
    const { pathname, query } = url.parse(reqUrl, true); //for accepting the query we do true
    //this id thing is called query, the way this url is written it is query
    // console.log(reqUrl, pathname, query); //{{localhostbaseurl}}cities/delete?id=10 query seperate before and after the ?

    if (pathname == "/cities" && method == "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const result = {
            success: true,
            data: database,
            message: "API found",
        };
        res.end(JSON.stringify(result));
    } else if (pathname == "/cities/add" && method == "POST") {
        let body = "";

        req.on("data", (chunk) => {
            //jo chunk aa rha h usko jod ke body me exact string bna diye then convert it to string
            body += chunk.toString();
        });
        req.on("end", () => {
            const PAYLOAD = JSON.parse(body);
            console.log(PAYLOAD);
            const { name, adventure } = PAYLOAD;

            database.push({
                id: database.length + 1,
                name,
                adventure,
            });
            res.writeHead(201, { "Content-Type": "application/json" });
            const result = {
                success: true,
                data: database,
                message: "Added",
            };
            res.end(JSON.stringify(result));
        });
    } else if (pathname == "/cities/update" && method == "PUT") {
        const { id } = query;
        if (!id) {
            res.writeHead(400, { "content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: false,
                    message: "Id not found",
                })
            );
        }
        let body = "";

        req.on("data", (chunk) => {
            //jo chunk aa rha h usko jod ke body me exact string bna diye then convert it to string
            body += chunk.toString();
        });
        req.on("end", () => {
            // console.log(id);
            // console.log(JSON.parse(body));
            const PAYLOAD = JSON.parse(body);
            const { name, adventure } = PAYLOAD;
            const index = database.findIndex((city) => {
                return city.id == id;
            });

            const oldCityData = JSON.parse(JSON.stringify(database[index]));
            if (name) {
                oldCityData.name = name;
            }
            if (adventure) {
                oldCityData.adventure = adventure;
            }
            database.splice(index, 1, oldCityData);

            res.writeHead(200, { "content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: true,
                    message: "updated successfully",
                })
            );
        });
    } else if (pathname == "/cities/delete" && method == "DELETE") {
        const { id } = query;
        if (!id) {
            res.writeHead(400, { "content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: false,
                    message: "Id not found",
                })
            );
        }
        const index = database.findIndex((city) => {
            return city.id === id;
        });
        database.splice(index, 1);
        res.writeHead(200, { "Content-Type": "application/json" });
        const result = {
            success: true,
            message: "City deleted successfully",
        };
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        const result = {
            success: false,
            message: "API not found",
        };
        res.end(JSON.stringify(result));
    }
    // console.log(url, method);
    // if (req.url == "/cities") {
    //     const data = ["raipur", "durg"];
    //     res.end(JSON.stringify(data));
    // }
    // console.log(req.url);
};

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
});
