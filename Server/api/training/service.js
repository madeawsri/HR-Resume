const pool = require("../../config/mysql")
const tableName = "hr_training"

module.exports = {

    create: (data, callBack) => {
        // console.log(data)
        pool.query(
            `insert into ${tableName} (
                profileid,
                trainno,
                course,
                location,
                tyear
            ) 
                values( ?,?,?,?,?)`, [
                data.profileid,
                data.trainno,
                data.course,
                data.location,
                data.tyear
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    update: (data, callBack) => {
        console.log(data)
        pool.query(
            `UPDATE  ${tableName} SET 

                course=?,
                location=?,
                tyear=?

            WHERE  profileid=? and trainno=? `, [

                data.course,
                data.location,
                data.tyear,

                data.profileid,
                data.trainno

            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getByID: (data, callBack) => {

        pool.query(
            `select * from ${tableName} where profileid = ? and trainno=?`, [data.profileid, data.trainno],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },






};