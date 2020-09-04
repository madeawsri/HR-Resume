const {
    create,
    update,
    getByID,
    getEducationLevelByID
} = require("./service");




module.exports = {
    createData(req, res) {
        const multer = require('multer')
        let upload = multer().none();
        upload(req, res, function(err) {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "** ไม่สามารถอัพโหลดรูปภาพได้ **"
                });
            }
            // **********************
            // insert & update data  from "FormData"
            // **********************
            const body = req.body;
            body.profileid = req.params.id
            body.levelid = req.params.lid

            const fdata = {
                profileid: body.profileid,
                levelid: body.levelid
            }

            getByID(fdata, async(err, uresults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
                    });
                }
                let data = uresults ? uresults : null
                if (data === null) {
                    // new insert
                    console.log('insert table family')
                    console.log(body)
                    await create(body, (err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "ได้ดำเนินการเพิ่มข้อมูลเรียบร้อย."
                        });
                    });


                } else {
                    console.log('update data ')
                    console.log(uresults)
                        // update data
                    await update(body, async(err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "อัพเดชข้อมูลเรียบร้อย."
                        });
                    });

                }
            })

            //******** END  */
        })




    },
    findByID: (req, res) => {
        console.log("fileByID")
        console.log(req.params)
        const fdata = {
            profileid: req.params.id,
            levelid: req.params.lid
        }

        getByID(fdata, async(err, uresults) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
                });
            }
            let data = uresults ? uresults : null
            return res.status(200).json({
                success: 1,
                data: data
            });
        })

    },
    findLevelByID: (req, res) => {
        //console.log('find level' + req.params.id)
        getEducationLevelByID(req.params.id, async(err, uresults) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
                });
            }
            let data = uresults ? uresults : null
            return res.status(200).json({
                success: 1,
                data: data
            });
        })

    },

};