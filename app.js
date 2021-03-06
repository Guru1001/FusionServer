var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var dishRouter = require("./routes/dishRouter");
var promoRouter = require("./routes/promoRouter");
var leaderRouter = require("./routes/leaderRouter");
var feedbackRouter = require("./routes/feedbackRouter");

const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./dbconfig");
const url = `mongodb+srv://${dbConfig.dbuser}:${dbConfig.dbpass}@cluster0.v4iwv.mongodb.net/confusion?retryWrites=true&w=majority`;
const connect = mongoose.connect(
    url,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify: false,
    }
);
connect.then((db)=>{
    console.log("Connected correctly to server")
}, (err)=> console.log(err));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);
app.use("/feedbacks", feedbackRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
