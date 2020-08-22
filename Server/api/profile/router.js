const router = require("express").Router();
//const { checkToken } = require("../../auth/token_validation");
const {
    createProfile,
    myPicture,
    findProfileByIDCard
} = require("./controller");

//const multer = require('multer');
//const upload = multer();
router.post("/:id", createProfile);
router.get('/img/:id', myPicture)
router.get('/:id?', findProfileByIDCard)
    //router.get('/data/:id', findProfileByIDCard)



module.exports = router;