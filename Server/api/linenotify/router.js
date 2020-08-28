const router = require("express").Router();

const lineNotify = require('line-notify-nodejs')(process.env.LINE_TOKEN);
router.post("/", async(req, res) => {
    lineNotify.notify(req.body).then(() => {
        res.send({ msg: req.params.msg, status: 'send completed!', success: 1 })
    }).catch((e) => {
        res.send({ msg: req.params.msg, status: 'send Error!', error: e.message, success: 0 })
    });
});

module.exports = router;