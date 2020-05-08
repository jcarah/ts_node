mport express from "express";
import path from "path"
const host = 'localhost';
const port = 3000;
// Initialize the app
const app = express();
// Tell the app where to find the views
app.set('views', path.join(__dirname, '../views'));
// Start using template engines
app.engine('html', require('ejs').renderFile);

app.get("/", function (req, res) {
   res.statusCode = 200;
   res.render('index.ejs', {message: "Hello world!" });
});
app.listen(3000, function () {
   console.log("App is listening on port 3000!");
});

