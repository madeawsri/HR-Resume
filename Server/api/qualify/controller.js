const {
    create,
    update,
    getByID,
    del,
    getAll,
    showPage


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
            body.id = req.params.id

            const fdata = {
                id: req.params.id,
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
                console.log(data)


                if (data === null) {
                    // new insert
                    console.log('insert table family')
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
                            message: "ได้ดำเนินการเพิ่มข้อมูลเรียบร้อย.",
                            data: results
                        });
                    });


                } else {
                    console.log('update data ')

                    //console.log(body)
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

        const fdata = {
            id: req.params.id,
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


    findAll: (req, res) => {

        const fdata = {
            id: null,
        }

        getAll(fdata, async(err, uresults) => {
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
                data: data,
                //type: 'all'
            });
        })

    },

    showByPage: (req, res) => {
        let id = req.params.id
        if (id === undefined)
            id = 0

        const fdata = {
            id: id
        }

        showPage(fdata, async(err, uresults) => {
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
                data: data,
                //type: 'all'
            });
        })


    },

    deleteByID: (req, res) => {

        const fdata = {
            id: req.params.id,
        }

        del(fdata, async(err, uresults) => {
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