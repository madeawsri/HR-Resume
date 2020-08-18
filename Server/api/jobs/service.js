const pool = require("../../config/mysql")
let curFolderName = __dirname.split("\\")
let lenCurFolderName = curFolderName.length - 1
curFolderName = curFolderName[lenCurFolderName]

const tableName = `hr_${curFolderName}`

module.exports = {

    create: (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into ${tableName} (
                topic,
                datein,
                dateout,
                jobattrid,
                positionid,
                num,
                ptype,
                stype
            ) 
                values( ?,?,?,?,?,?,?,?)`, [
                data.topic,
                data.datein,
                data.dateout,
                data.jobattr,
                data.position,
                data.num,
                data.ptype,
                data.stype
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
            datein=?,
            dateout=?,
            jobattrid=?,
            positionid=?,
            num=?,
            ptype=?,
            stype=?

            WHERE  id=? `, [
                data.topic,
                data.datein,
                data.dateout,
                data.jobattr,
                data.position,
                data.num,
                data.ptype,
                data.stype,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    del: (data, callBack) => {
        console.log(data)
        pool.query(
            `DELETE FROM  ${tableName} WHERE  id=? `, [
                data.id,
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
        /*
        SELECT   x.* , y.*   FROM hr_jobs AS x , hr_jobattr AS y 
        WHERE x.id = 8 
        AND y.id = (SUBSTRING(x.jobattrid,LOCATE(':',x.jobattrid)+1, LOCATE(',',x.jobattrid)-LOCATE(':',x.jobattrid)-1 ))
        */
        //select * from ${tableName} where id = ?
        if (data.id === undefined) data.id = 0
        pool.query(
            `SELECT  x.id as xid, x.topic as xtopic, x.* , y.id as yid,  y.*   FROM hr_jobs AS x , hr_jobattr AS y 
            WHERE x.id = ${data.id}
            AND y.id = (SUBSTRING(x.jobattrid,LOCATE(':',x.jobattrid)+1, LOCATE(',',x.jobattrid)-LOCATE(':',x.jobattrid)-1 ))`,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );

    },


    getAll: (data, callBack) => {

        pool.query(
            `select * from ${tableName} `,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );

    },



    showPage: (data, callBack) => {

        let id = data.id
        let max = 3
        id = (id * max)

        pool.query(
            `select * from ${tableName} order by id desc limit ${max} offset ${id}  `,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );

    },


};