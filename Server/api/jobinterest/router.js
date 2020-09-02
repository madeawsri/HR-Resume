const router = require("express").Router();

const {
    createData,
    findByID,
    deleteByID,
    findAll,
    updateNud,
    updatePmdate,
    updateWorkdate

} = require("./controller");

router.post("/:id/:jobid", createData);
router.put("/:id/:jobid", updateNud);
router.patch("/contract", updatePmdate)
router.patch("/work", updateWorkdate)

router.get("/", findAll);
router.get('/:id/:jobid?', findByID)

router.delete('/:id/:jobid', deleteByID)

module.exports = router;