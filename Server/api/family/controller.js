const {
    create,
    update,
    getByID,
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
            getByID(body.profileid, async(err, uresults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
                    });
                }
                let data = uresults ? uresults : null
                console.log("insert family")
                console.log(data)
                if (data.length == 0) {
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
        getByID(req.params.id, async(err, uresults) => {
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