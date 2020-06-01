//core module
const express = require("express");
const app = express();
const router = express.Router();

const { users, userrole } = require("../config/database.js");
const validuser = require("./checkvalid");

router.post("/accept", async (req, res, next) => {
    try {
        userrole.update(
            {status : 'approved',pendingrequest : 'false'},
            {where : {email : req.body.email}}
        );
    } catch (error) {
        console.log(error);
    }
});
router.post("/reject", async (req, res, next) => {
    try {
        userrole.update(
            {status : 'reject',pendingrequest : 'false'},
            {where : {email : req.body.email}}
        );
    } catch (error) {
        console.log(error);
    }
});

module.exports = {
    acceptReject : router
}