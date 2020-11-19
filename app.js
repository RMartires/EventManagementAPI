var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var swaggerUi = require("swagger-ui-express");
var sawggerJSDocs = require("swagger-jsdoc");

const dbService = require("./configs/db.service");

var EventRoutes = require("./routes/EventRoutes");
var UserRoutes = require("./routes/UserRoutes");
const swaggerJSDoc = require("swagger-jsdoc");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//swagger docs
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Event Management API",
      description: "assignment api to manage events",
      version: "0.1.0",
      servers: ["http://localhost:3000/"],
    },
  },
  apis: ["./swag.yml"],
};

const swaggerdocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerdocs));

//connect to db
app.use("/", async (req, res, next) => {
  await dbService.start(process.env.migrate, req, res, next);
});

app.use("/event/", EventRoutes);
app.use("/user/", UserRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
