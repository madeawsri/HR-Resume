const router = require("express").Router();
const {
    getDatas,
    getPages,
    getAll
} = require("./controller");

router.get("/id/:id", getDatas);
router.get("/page/:page?", getPages);
router.get("/all", getAll);

module.exports = router;