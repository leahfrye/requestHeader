const express = require("express");
const app = express();

app.get("/", function(req, res) {
    let ipAddress = req.connection.remoteAddress;
    let software = req.headers["user-agent"];

    // Get IP address from string
    if (ipAddress.split("").indexOf(":") !== -1) {
        let reversed = ipAddress.split("").reverse();
        let indexToCut = reversed.indexOf(reversed.find(function(item, index) {return item === ":"}));
        ipAddress = reversed.slice(0, indexToCut).reverse().join();
    }

    console.log(ipAddress.substring(ipAddress.indexOf(":") + 1))

    let data = {
        ipAddress: ipAddress,
        language: req.headers["accept-language"].split(",")[0],
        software: req.headers["user-agent"].match(/\(([^)]+)\)/)[1],
    }

    res.status(200).json(data);
});

app.listen(3000, function() {
    console.log("App listening on port 3000");
});