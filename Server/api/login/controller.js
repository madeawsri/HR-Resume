const {
    create,
    getUserByCardid,
    getUserLogin,
    /*getUsers,
    updateUser,
    deleteUser*/
} = require("./service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        getUserByCardid(body.idcard, (err, uresults) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
                });
            }
            let data = uresults ? uresults : null
            if (data === null) {

                const salt = genSaltSync(10);
                body.password = hashSync(body.birthday.split('/').join(''), salt);

                create(body, (err, results) => {
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
                return res.status(200).json({
                    success: 0,
                    message: "รหัสบัตรประจำตัวประชาชน มีแล้ว!"
                });
            }
            /*
             */

        })



        /**
         
         */
    },
    login: (req, res) => {
        const body = req.body;
        getUserByCardid(body.username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "KSL-NP", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    data: results
                });





            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },
    /*
    login: (req, res) => {
        const body = req.body;
        //console.log(body)
        getUserLogin(body, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password",
                    data: results
                });
            } else {
                return res.json({
                    success: 1,
                    message: "login successfully",
                    data: results
                        //token: jsontoken
                });
            }

        });
    },
    */
    /*
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    }*/
};