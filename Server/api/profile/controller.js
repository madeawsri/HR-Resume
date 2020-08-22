const {
    create,
    update,
    getUserByCardid,
    updateRegister,
    getData,
    getDataAll,
} = require("./service");

const { hashSync, genSaltSync } = require("bcrypt");

function createData(req, res) {

    const body = req.body;
    let changedDate = body.birthday.replace(/(..)\/(..)\/(....)/, '$2-$1');
    const changedDateYear = body.birthday.replace(/(..)\/(..)\/(....)/, '$3');
    let yearTh = changedDateYear - 543;
    changedDate = yearTh + '-' + changedDate
    var date = new Date(changedDate);
    let date2 = new Date((Date.now() - date));

    body.age = Math.abs((new Date(date2)).getUTCFullYear() - 1970);
    console.log(req.files)
    getUserByCardid(body.profileid, async(err, uresults) => {
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
                    data: results
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

                const salt = genSaltSync(10);
                body.password = hashSync(body.birthday.split('/').join(''), salt);

                await updateRegister(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "success",
                        data: results
                    });
                });
            });

        }
    })
}

module.exports = {
    createProfile: (req, res) => {
        const idcard = req.params.id
        const multer = require('multer')
        const path = require('path')
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, './uploads/')
            },
            filename: function(req, file, cb) {
                console.log(req.body)
                cb(null, idcard + path.extname(file.originalname))
            }
        })

        let upload = multer({ storage: storage, }).single('file');
        upload(req, res, function(err) {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "** ไม่สามารถอัพโหลดรูปภาพได้ **"
                });
            }
            // insert & update data is profile
            createData(req, res);

        })
    },
    myPicture: (req, res) => {
        let id = req.params.id //.split(' ').join('')
        var path = `./uploads/${id}.jpg`;
        const fs = require('fs')
        try {
            if (fs.existsSync(path)) {
                //  let buff = new Buffer(data, 'base64');
                // fs.writeFileSync(path, buff);

                var bitmap = fs.readFileSync(path);
                // convert binary data to base64 encoded string
                return res.status(200).json({
                    success: 1,
                    message: "พบรูปภาพ",
                    data: new Buffer(bitmap).toString('base64')
                });
            } else {
                return res.status(200).json({
                    success: 0,
                    message: "ไม่พบรูปภาพ",
                    data: path
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: 0,
                message: "ไม่พบรูปภาพ",
                data: path
            });
        }

    },
    findProfileByIDCard: (req, res) => {
        if (req.params.id === undefined)
            getDataAll(async(err, uresults) => {
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
        else
            getData(req.params.id, async(err, uresults) => {
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
    findProfileDataByIDCard: (req, res) => {
        getUserByCardid(req.params.id, async(err, uresults) => {
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