const router = require("express").Router();
const {
    getDatas,
    getPages,
    getAll,
    updateStatus
} = require("./controller");

router.get("/id/:id", getDatas);
router.get("/page/:page?", getPages);
router.get("/all", getAll);
router.put("/permission", updateStatus)

module.exports = router;