const express = require("express");
const bodyParser = require("body-parser");

const Feedbacks = require("../models/feedbacks");

const feedbackRouter = express.Router();
feedbackRouter.use(bodyParser.json());

feedbackRouter.route("/")
.get((req, res, next)=>{
    Feedbacks.find({})
    .then((feedbacks)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(feedbacks);

    },(err)=>next(err))
    .catch((err) => next(err));
})
.post((req, res, next)=>{
    Feedbacks.create(req.body)
    .then((feedback)=>{
        console.log("Feedback created ", feedback);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(feedback);
    },(err)=>next(err))
    .catch((err) => next(err));
})
.put((req, res, next)=>{
    res.statusCode = 403;
    res.end("Put operation not supported on feedbacks");
})

module.exports = feedbackRouter;