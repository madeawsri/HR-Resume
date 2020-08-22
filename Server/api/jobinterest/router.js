const router = require("express").Router();

const {
    createData,
    findByID,
    deleteByID,
    findAll,
    showByPage

} = require("./controller");

//router.post("/", createData);
router.post("/:id/:jobid", createData);
router.get("/", findAll);
router.get('/:id/:jobid?', findByID)
    //router.get('/page/:id(\\d+)?', showByPage)
router.delete('/:id/:jobid', deleteByID)

module.exports = router;