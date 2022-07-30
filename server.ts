import express, {Application, Request, Response, NextFunction} from 'express';
import sgMail from "@sendgrid/mail";
import bodyParser from 'body-parser';
import WebhookRoutes from './routes/webhook.routes.js';
import ClientRoutes from './routes/client.routes.js';
import EmailRoutes from './routes/email.routes.js';
import FbMessageFromRoutes from './routes/fbMessageFrom.routes.js';
import FbMessageToRoutes from './routes/fbMessageTo.routes.js';
import ProductRoutes from './routes/product.routes.js';
import {db} from './models/index.js';
import {importProducts} from "./controllers/product.controller.js";

const app:Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req:Request, res:Response):void => {
    res.json({ message: "Welcome to respondio-assessment application" });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, ():void => {
    console.log(`Server is running on port ${PORT}.`);
});

// register all the routers
app.use('/webhook', WebhookRoutes);
app.use('/api/email', EmailRoutes);
app.use('/api/fbMessageFrom', FbMessageFromRoutes);
app.use('/api/fbMessageTo', FbMessageToRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/client', ClientRoutes);

await db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((err: Error) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
console.log("Connected to the database!");

// sendgrid API Key
sgMail.setApiKey('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')

// await importProducts();

// error handling middleware
app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    res.status(500);
    if (req.xhr) {
        res.send({ error: 'Something failed!' })
    } else {
        res.json({
            status: 500,
            message: err.message,
            error: err
        });
    }
});