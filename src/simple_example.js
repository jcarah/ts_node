"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var host = 'localhost';
var port = 3000;
// Initialize the app
var app = express_1.default();
// Tell the app where to find the views
app.set('views', path_1.default.join(__dirname, '../views'));
// Start using template engines
app.engine('html', require('ejs').renderFile);
app.get("/", function (req, res) {
    res.statusCode = 200;
    res.render('index.ejs', { message: "Hello world!" });
});
app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});
