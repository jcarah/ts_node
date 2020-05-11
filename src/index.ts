import { LookerNodeSDK } from '@looker/sdk';
import express from "express";
import path from "path"

const app = express();
app.set('views', path.join(__dirname, '../views'));
app.engine('html', require('ejs').renderFile);

async function getLook(lookId: number ) {
    // create a Node SDK object for API 3.1
    const sdk = LookerNodeSDK.init31()
    const data = await sdk.ok(
        sdk.run_look({ result_format: 'json', look_id: lookId })
    )
    await sdk.authSession.logout()
    if (!sdk.authSession.isAuthenticated()) {
        console.log('Logout successful')
    }
    return JSON.stringify(data);
}

app.get("/", function (req, res) {
    res.statusCode = 200;
    // set your lookId below
    getLook(22).then(s => res.render('index.ejs', {message: s }));
});
app.listen(3000, function () {
    console.log("App is listening on port 3000!");
});
