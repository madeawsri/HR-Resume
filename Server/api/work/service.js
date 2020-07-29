const pool = require("../../config/mysql")
const tableName = "hr_work"

module.exports = {

    create: (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into ${tableName} (
                profileid,
                workno,
                workplace,
                begintime,
                endtime,
                position,
                salary,
                detail,
                note
            ) 
                values( ?,?,?,?,?,
                        ?,?,?,?)`, [
                data.profileid,
                data.workno,
                data.workplace,
                data.begintime,
                data.endtime,
                data.position,
                data.salary,
                data.detail,
                data.note
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

            workplace=?,
            begintime=?,
            endtime=?,
            position=?,
            salary=?,
            detail=?,
            note=?

            WHERE  profileid=? and workno=? `, [

                data.workplace,
                data.begintime,
                data.endtime,
                data.position,
                data.salary,
                data.detail,
                data.note,

                data.profileid,
                data.workno

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
            `select * from ${tableName} where profileid = ? and workno=?`, [data.profileid, data.workno],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },






};