const router = require("express").Router();

const {
    createData,
    findByID,
    deleteByID,
    findAll,
    showByPage,
    findList

} = require("./controller");

router.post("/", createData);
router.post("/:id", createData);
router.get("/", findAll);
router.get('/:id(\\d+)', findByID)
router.get('/list', findList)
router.get('/page/:id(\\d+)?', showByPage)

router.delete('/:id', deleteByID)

module.exports = router;