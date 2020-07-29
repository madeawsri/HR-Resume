const router = require("express").Router();

const {
    createData,
    findByID,
    findLevelByID
} = require("./controller");

router.post("/:id/:lid", createData);
router.get('/level/?:id', findLevelByID)

router.get('/profile/:id/:lid', findByID)

module.exports = router;