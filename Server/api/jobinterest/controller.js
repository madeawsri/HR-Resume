const {
    create,
    update,
    getByID,
    del,
    getAll,
    showPage,
    updatenud,
    updatepmdate,
    updateworkdate

} = require("./service");




module.exports = {
    async updateWorkdate(req, res) {
        let body = req.body
        console.log(body)

        await updateworkdate(body, async(err, results) => {
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
    },
    async updatePmdate(req, res) {
        let body = req.body
        console.log(body)

        await updatepmdate(body, async(err, results) => {
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
    },
    async updateNud(req, res) {
        let body = req.body
        console.log(body)
        await updatenud(body, async(err, results) => {
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

    },
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

            console.log(body)

            const fdata = {
                idcard: req.params.id,
                jobid: req.params.jobid
            }

            body.idcard = fdata.idcard
            body.jobid = fdata.jobid

            getByID(fdata, async(err, uresults) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "** ไม่สามารถติดต่อฐานข้อมูลได้ getByID **"
                    });
                }
                let data = uresults ? uresults : null
                console.log("get by id ")
                console.log(data)


                if (data === null) {
                    // new insert
                    //console.log('insert table family')
                    await create(body, (err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: 0,
                                message: "** ไม่สามารถติดต่อฐานข้อมูลได้ Insert **"
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
            idcard: req.params.id,
            jobid: req.params.jobid
        }
        console.log(fdata)
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
                data: data,
                id: req.params.id,
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

            });
        })


    },

    deleteByID: (req, res) => {

        const fdata = {
            idcard: req.params.id,
            jobid: req.params.jobid
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