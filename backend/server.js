const express = require('express');
const app = express();

app.get("/user", (req, res) => {
    res.send("<h1>Jason Is God</h1>");
});


app.listen(3000, () => {
    console.log("listening on port 3000");
});
