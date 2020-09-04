const router = require("express").Router();

const {
    createData,
    findByID,

} = require("./controller");

router.post("/:id/:lid", createData);
router.get('/profile/:id/:lid?', findByID)

module.exports = router;