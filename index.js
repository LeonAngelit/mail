const express = require("express");
const routerApi = require("./routes/index");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3020;
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./midlewares/error.handler");

const { authKey } = require("./midlewares/auth.handler");
const { jwtAuth } = require("./midlewares/auth.handler");

app.use(express.json());

//Para el ejemplo he dejado la api abierta desde cualquier dirección mediante CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Leon");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(authKey);
app.use(jwtAuth);

app.listen(port, () => {
  console.log("My port" + port);
});

module.exports = app;
