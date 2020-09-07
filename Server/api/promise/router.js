const router = require("express").Router();

const {
    createData,
    getData,
    updateStatus
} = require("./controller");

router.post("/:id", createData);
router.get('/:id?', getData)
router.patch('/', updateStatus)

module.exports = router;