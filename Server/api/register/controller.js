const {
    getData,
    getDataByPage,
    getDataAll,
    updateStatusRegister
} = require("./service");
//const { hashSync, genSaltSync, compareSync } = require("bcrypt");
//const { sign } = require("jsonwebtoken");

module.exports = {
    updateStatus: (req, res) => {

        let data = req.body

        updateStatusRegister(data, (err, results) => {
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
    getDatas: (req, res) => {
        let data = {
            idcard: req.params.id,
            page: req.params.page
        }
        console.log(data)
        getData(data, (err, results) => {
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
    getPages: (req, res) => {
        let data = {
            page: req.params.page
        }
        getDataByPage(data, (err, results) => {
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

    getAll: (req, res) => {
        let data = {
            page: req.params.page
        }
        getDataAll(data, (err, results) => {
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
};