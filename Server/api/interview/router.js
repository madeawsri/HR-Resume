const router = require("express").Router();

const {
    createData,
    findByID,
    deleteByID,
    findAll,
    updateNud

} = require("./controller");

//router.post("/:id/:jobid", createData);
router.put("/:id/:jobid", updateNud);
router.get("/", findAll);
router.get("/jobid/:id", findAll);
router.get("/profileid/:pid", findAll);


module.exports = router;