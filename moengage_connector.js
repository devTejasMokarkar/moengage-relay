const helmet = require("helmet");
var morgan = require('morgan');
var bodyParser = require('body-parser');
const path = require('path');
const express = require("express");
const app = express();
const { PORT, LOG_FORMAT } = require("./config");
const { logger, stream } = require("./utils/logger");
const { ErrorMiddleware } = require("./middlewares/error.middleware");

const port = PORT || 5311;
const env = "development";


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(LOG_FORMAT, { stream }));
app.use(helmet());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route handler for the root route ("/")
app.get('/test', (req, res) => {
    // Send the index.html file as the response
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// routes declare
const whatsapp_to_moengage_connectorRouter = require("./routes/whatsapp_to_moengage_connector.route.js");
//set health route
const healthRouter = require("./routes/health.route.js");
app.use(whatsapp_to_moengage_connectorRouter);
app.use(healthRouter);

app.use(ErrorMiddleware);

app.listen(port, () => {
    logger.info(`=====================================================`);
    logger.info(`======= ENV: ${env} ============================`);
    logger.info(`🚀 moengage_connector 1 server runnig on port ${port}`);
    logger.info(`=====================================================`);
});




