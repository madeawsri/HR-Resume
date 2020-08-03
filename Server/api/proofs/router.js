const router = require("express").Router();

const {
    createData,
    findByID,
    deleteByID,
    findAll

} = require("./controller");

router.post("/", createData);
router.post("/:id", createData);
router.get("/", findAll);
router.get('/:id', findByID)

router.delete('/:id', deleteByID)

module.exports = router;