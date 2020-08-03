const pool = require("../../config/mysql")
const tableName = "hr_knowledge"

module.exports = {

    create: (data, callBack) => {
        // console.log(data)
        pool.query(
            `insert into ${tableName} (
                profileid,
                topic,
                detail,
                reng,
                weng,
                seng,
                rch,
                wch,
                sch,
                roth,
                woth,
                soth,
                workname,
                workid,
                raw,
                rawok,
                certcarid,
                sick,
                sickname
            ) 
                values( 
                    ?,?,?,?,?,
                    ?,?,?,?,?,
                    ?,?,?,?,?,
                    ?,?,?,?
                    )`, [
                data.profileid,
                data.topic,
                data.detail,
                data.reng,
                data.weng,
                data.seng,
                data.rch,
                data.wch,
                data.sch,
                data.roth,
                data.woth,
                data.soth,
                data.workname,
                data.workid,
                data.raw,
                data.rawok,
                data.certcarid,
                data.sick,
                data.sickname
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

            topic=?,
            detail=?,
            reng=?,
            weng=?,
            seng=?,
            rch=?,
            wch=?,
            sch=?,
            roth=?,
            woth=?,
            soth=?,
            workname=?,
            workid=?,
            raw=?,
            rawok=?,
            certcarid=?,
            sick=?,
            sickname=?

            WHERE  profileid=?  `, [


                data.topic,
                data.detail,
                data.reng,
                data.weng,
                data.seng,
                data.rch,
                data.wch,
                data.sch,
                data.roth,
                data.woth,
                data.soth,
                data.workname,
                data.workid,
                data.raw,
                data.rawok,
                data.certcarid,
                data.sick,
                data.sickname,
                data.profileid

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
            `select * from ${tableName} where profileid = ? `, [data.profileid],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },






};