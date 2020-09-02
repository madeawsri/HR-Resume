const router = require("express").Router();

const {
    createData,
} = require("./controller");

router.post("/:id", createData);
//router.get('/level/?:id', findLevelByID)
//router.get('/profile/:id/:lid', findByID)

module.exports = router;