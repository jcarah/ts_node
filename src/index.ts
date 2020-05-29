import { LookerNodeSDK } from "@looker/sdk";
import express from "express";
import path from "path";
import cors from "cors";

const app = express();
app.set("views", path.join(__dirname, "../views"));
app.engine("html", require("ejs").renderFile);

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET",
  origin: "http://localhost:3000",
  preflightContinue: false,
};

//use cors middleware
app.use(cors(options));

//add your routes

//enable pre-flight
app.options("*", cors(options));

async function getLook(lookId: number) {
  // create a Node SDK object for API 3.1
  const sdk = LookerNodeSDK.init31();
  const data = await sdk.ok(
    sdk.run_look({ result_format: "json", look_id: lookId })
  );
  await sdk.authSession.logout();
  return JSON.stringify(data);
}

app.get("/data", function (req, res) {
  res.statusCode = 200;
  // set your lookId below
  getLook(22).then((s) => res.end(s));
});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
