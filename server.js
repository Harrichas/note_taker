const express = require("express");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const dbJSON = require("./db/db.json");
const path = require("path");

var app = express();
var PORT = process.env.PORT||3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json(

));
app.use(express.static(
    "./public"
));

require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)

app.listen(PORT, function(){
    console.log("app now listening")
});