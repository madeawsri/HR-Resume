const router = require("express").Router();

const {
    createData,
    findByID,

} = require("./controller");

router.post("/:id", createData);
router.get('/profile/:id', findByID)

module.exports = router;