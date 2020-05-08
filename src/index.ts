import { LookerNodeSDK } from '@looker/sdk';
import express from "express";
// import ejs from "ejs";
import path from "path"
const host = 'localhost';
const port = 3000;
// import express from "express"
// import { Response } from "express";
// Create a new express app instance
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.engine('html', require('ejs').renderFile);

async function foo() {
    // create a Node SDK object for API 3.1
    // tslint:disable-next-line:no-console
    const sdk = LookerNodeSDK.init31()
    const data = await sdk.ok(sdk.run_look({ result_format: 'json', look_id: 22 }))

    // make any other calls to the Looker SDK
    await sdk.authSession.logout()
    if (!sdk.authSession.isAuthenticated()) {
        console.log('Logout successful')
    }
    return JSON.stringify(data);
}

app.get("/", function (req, res) {
    res.statusCode = 200;
    // response.setHeader('Content-Type', 'text/plain');
    const data = foo();
    // foo().then(s => res.end(s))
    foo().then(s => res.render('index.ejs', {message: s }));
});
app.listen(3000, function () {
    // tslint:disable-next-line:no-console
    console.log("App is listening on port 3000!");
});
